// src/pricing
const solver = require('javascript-lp-solver');

const conf = require('./conf').conf;
const { pricing } = require('./constants');

const {
  GB_VOLUME_STORAGE,
  COMPUTE_MINIMUM_COST,
  R1, R1_COST, R1_GB, R1_vCPU,
  R2, R2_COST, R2_GB, R2_vCPU,
} = pricing;

const estimateRavelloDeploymentCost = module.exports.estimateRavelloDeploymentCost = ({ cpu, disk, memory }, customPricing) => {

  const r1Cost = customPricing && customPricing['R1_COST'] ? customPricing['R1_COST'] : R1_COST;
  const r2Cost = customPricing && customPricing['R2_COST'] ? customPricing['R2_COST'] : R2_COST;
  const volumeStorageCost = customPricing && customPricing['GB_VOLUME_STORAGE'] ? customPricing['GB_VOLUME_STORAGE'] : GB_VOLUME_STORAGE;
  const computeMinimumCost = customPricing && customPricing['COMPUTE_MINIMUM_COST'] ? customPricing['COMPUTE_MINIMUM_COST'] : COMPUTE_MINIMUM_COST;

  const diskCost = (disk * volumeStorageCost);

  if (cpu < 1) { return diskCost; }

  const solverModel = {
    'optimize': 'cost',
    'opType':   'min',
    'constraints': {
        'vCPU': { 'min': cpu },
        'GB':   { 'min': memory },
      },
    'variables': {
      [ R1 ]: { cost: r1Cost, GB: R1_GB, vCPU: R1_vCPU },
      [ R2 ]: { cost: r2Cost, GB: R2_GB, vCPU: R2_vCPU },
    },
    ints: { [ R1 ]: 1, [ R2 ]: 1 },
  };

  const rDist = solver.Solve(solverModel);

  let computeCost = (rDist[R1] ? rDist[R1] * r1Cost : 0) + (rDist[R2] ? rDist[R2] * r2Cost : 0);
  if (computeCost < computeMinimumCost) { computeCost = computeMinimumCost; }

  return computeCost + diskCost
}

const estimateRavelloComputeDistribution = module.exports.estimateRavelloComputeDistribution = ({ cpu, memory }) => {
  const cpuMemRatio = cpu / memory;
  const minRs = Math.ceil(cpu / 2);

  let rDist = { [ R1 ]: 0, [ R2 ]: 0 };
  let memRemaining = 0;

  if (cpuMemRatio <= 0.25) {
    rDist[R2] = minRs;
    memRemaining = memory - (minRs * R2_GB);
  } else {
    rDist[R1] = minRs;
    memRemaining = memory - (minRs * R1_GB);
  }

  if (memRemaining > 0) {
    const R2Fill = memRemaining / R2_GB;
    const R2FillFloor = Math.floor(R2Fill);
    const R2FillRemainder = R2Fill % 1;

    rDist[R2] += R2FillFloor;
    R2FillRemainder <= 0.5 ? rDist[R1] += 1 : rDist[R2] += 1;
  }

  return rDist;
};
