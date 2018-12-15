// src/waiters
const conf  = require('./conf').conf;
const request = require('./request');
const { vmStates, loadingStatuses } = require('./constants');
const { getVMState, getImage, isApplicationPublished } = require('./methods');

const invalidResourceStates = {
  [ vmStates.STARTED ]: vmStates.STOPPED,
  [ vmStates.STOPPED ]: vmStates.STARTED,
};

const composeMethod = ({ method, path }) => (body) => request({ path, method, body });

const waitFor = ({ method, methodArgs, maxTries=5, retryInterval=15, targetName, targetId, targetAttribute, expectedValue, failureValue }) => {
  return new conf.Promise((resolve, reject) => {
    const retry = (i) => (
      composeMethod(method)(methodArgs).then((response) => {
        const attr = targetAttribute ? response[targetAttribute] : response;

        if (attr === expectedValue) {
          return resolve(response);
        }

        if (attr === failureValue) {
          let error = new Error('Expected failure value reached.');
          error.code = 'ExpectedFailure';
          throw error;
        }

        // If the resource won't ever reach the expected state, throw an error
        if (invalidResourceStates[expectedValue] && attr === invalidResourceStates[expectedValue]) {
          const err = new Error(`The resource is not in a valid state to reach ${expectedValue}. Current state: ${attr}`);
          err.code = 'ResourceInvalidStateError';
          err.state = attr;
          throw err;
        }

        conf.Logger({
          level: 'INFO',
          type: 'waiter',
          message: `${targetName} ${targetId} is in condition ${attr}, waiting for condition ${expectedValue} [ Attempt # ${i} ]`
        });

        throw new Error(`Retry #${i}`);
      })
      .catch((err) => {

        if (err.message) {
          conf.Logger({
            level: 'INFO',
            type: 'waiter',
            message: err.message
          });
        }

        if (err.code === 'ResourceInvalidStateError' || err.code === 'ExpectedFailure') { return reject(err); }

        if (i >= maxTries) {
          return reject(`Maximum tries exceeded waiting for ${targetName} ${targetId} to reach ${expectedValue}`);
        }

        return setTimeout(() => retry(i + 1), retryInterval * 1000);
      })
    );

    return retry(1);
  });
};

const waitForVMState = module.exports.waitForVMState = (appId, vmId, expectedValue) => (
  waitFor({
    expectedValue,
    failureValue: vmStates.ERROR,
    method:     getVMState,
    methodArgs: { appId, vmId },
    maxTries:   120,
    targetId:   vmId,
    targetName: 'VM',
  })
);

const waitForPublished = module.exports.waitForPublished = (appId) => (
  waitFor({
    method:     isApplicationPublished,
    methodArgs: { appId },
    targetId:   appId,
    targetName: 'Application',
    targetAttribute: 'value',
    expectedValue: true,
  })
);

const waitForImageState = module.exports.waitForImageState = (imageId, expectedValue) => (
  waitFor({
    expectedValue,
    method:          getImage,
    methodArgs:      { imageId },
    maxTries:        120,
    targetAttribute: 'loadingStatus',
    targetId:        imageId,
    targetName:      'Image',
  })
);
