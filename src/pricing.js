// src/pricing

const conf = require('./conf').conf;
const { pricing } = require('./constants');

const {
  GB_VOLUME_STORAGE,
  COMPUTE_MINIMUM_COST,
  R1, R1_COST, R1_GB,
  R2, R2_COST, R2_GB,
} = pricing;

const estimateRavelloDeploymentCost = module.exports.estimateRavelloDeploymentCost = ({ cpu, disk, memory }, customPricing) => {
  const rDist = estimateRavelloComputeDistribution({ cpu, memory });

  let r1Cost = customPricing && customPricing['R1_COST'] ? customPricing['R1_COST'] : R1_COST;
  let r2Cost = customPricing && customPricing['R2_COST'] ? customPricing['R2_COST'] : R2_COST;
  let volumeStorageCost = customPricing && customPricing['GB_VOLUME_STORAGE'] ? customPricing['GB_VOLUME_STORAGE'] : GB_VOLUME_STORAGE;

  let computeCost = (rDist[R1] * r1Cost) + (rDist[R2] * r2Cost);
  if (computeCost < COMPUTE_MINIMUM_COST) { computeCost = COMPUTE_MINIMUM_COST; }

  return computeCost + (disk * volumeStorageCost);
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
