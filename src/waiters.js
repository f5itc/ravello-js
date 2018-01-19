// src/waiters
const conf  = require('./conf').conf;
const request = require('./request');
const { vmStates, loadingStatuses } = require('./constants');
const { getVMState, getImage, isApplicationPublished } = require('./methods');

const composeMethod = ({ method, path }) => (body) => request({ path, method, body });

const waitFor = ({ method, methodArgs, maxTries=5, retryInterval=15, targetName, targetId, targetAttribute, expectedValue }) => {

  return new conf.Promise((resolve, reject) => {
    const retry = (i) => {
      composeMethod(method)(methodArgs)
        .then((response) => {
          const attr = targetAttribute ? response[targetAttribute] : response;

          if (attr === expectedValue) {
            return resolve(response);
          }

          console.log(`${targetName} ${targetId} is in condition ${attr} [ Attempt # ${i} ]`);
          throw new Error(`Retry #${attempt}`);
        })
        .catch((err) => {

          if (i >= maxTries) {
            return reject(`Maximum tries exceeded waiting for ${targetName} ${targetId} to reach ${expectedValue}`);
          }

          setTimeout(() => retry(i + 1), retryInterval * 1000);
        });
    };

    retry(1);
  });
};

const waitForVMState = module.exports.waitForVMState = (appId, vmId, expectedValue) => (
  waitFor({
    expectedValue,
    method:     getVMState,
    methodArgs: { appId, vmId },
    maxTries:   40,
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
    targetAttribute: 'loadingStatus',
    targetId:        imageId,
    targetName:      'Image',
  })
);
