// src/waiters

const { vmStates } = require('./constants');
const { getVMState } = require('./methods');

const maxTries = 5;
const retryInterval = 15;

const waitForState = ({ method, methodArgs, numTries=0, targetId, targetName }) => (

  method(methodArgs).then(({ state }) => {
    numTries += 1;

    if (state === targetState) {
      console.log(`${targetName} ${targetId} is in state ${state} [ Attempt # ${numTries} ]`);
      return resolve(state);
    }

    if (numTries >= maxTries) {
      throw new Error(`Maximum tries exceeded waiting for ${targetName} ${targetId} to reach ${targetState}`);
    }

    console.log(`${targetName} ${targetId} is in state ${state} -- Retrying for state ${targetState}`);
    return setTimeout(waitForState, 15 * 1000, { method, methodArgs, numTries, targetId, targetName });
  })

);

const waitForVMState = module.exports.waitForVMState = (appId, vmId, targetState) => (
  waitForState({
    method:     getVMstate,
    methodArgs: { appId, vmId },
    targetId:   vmId,
    targetName: 'VM',
  })
);
