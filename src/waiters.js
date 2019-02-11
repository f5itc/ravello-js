// src/waiters
const conf  = require('./conf').conf;
const request = require('./request');
const { vmStates, loadingStatuses } = require('./constants');
const { getVMDeployment, getVMState, getImage, isApplicationPublished, pageNotifications } = require('./methods');

const invalidResourceStates = {
  [ vmStates.STARTED ]: vmStates.STOPPED,
  [ vmStates.STOPPED ]: vmStates.STARTED,
};

const composeMethod = ({ method, path }) => (body) => request({ path, method, body });

const waitFor = ({ expectedValue, failureValue, maxTries=5, method, methodArgs, retryInterval=15, targetId, targetName, targetValue }) => {
  return new conf.Promise((resolve, reject) => {
    const retry = (i) => (
      composeMethod(method)(methodArgs).then((response) => {
        const value = targetValue ? targetValue(response) : response;

        if (value === expectedValue) {
          conf.Logger({
            level: 'INFO',
            type: 'waiter',
            message: `${targetName} ${targetId} is in expected state ${expectedValue}.`
          });

          return resolve(response);
        }

        if (failureValue && value === failureValue) {
          let error = new Error('Expected failure value reached.');
          error.code = 'ExpectedFailure';
          throw error;
        }

        // If the resource won't ever reach the expected state, throw an error
        if (invalidResourceStates[expectedValue] && invalidResourceStates[expectedValue] === value) {
          const err = new Error(`The resource is not in a valid state to reach ${expectedValue}. Current state: ${value}`);
          err.code = 'ResourceInvalidStateError';
          err.state = value;
          throw err;
        }

        conf.Logger({
          level: 'INFO',
          type: 'waiter',
          message: `${targetName} ${targetId} is in condition ${value}, waiting for condition ${expectedValue} [ Attempt # ${i} ]`
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
    maxTries:     120,
    method:       getVMState,
    methodArgs:   { appId, vmId },
    targetId:     vmId,
    targetName:   'VM',
  })
);

const waitForSnapshotState = module.exports.waitForSnapshotState = (appId, vmId, expectedValue) => (
  waitFor({
    expectedValue,
    maxTries:    120,
    method:      getVMDeployment,
    methodArgs:  { appId, vmId },
    targetId:    vmId,
    targetName:  'Snapshot',
    targetValue: (response) => {
      // If any status isn't the expected value, consider it the target value
      const vmStatus = response.loadingStatus;
      if (vmStatus !== expectedValue) { return vmStatus; }

      const diskStatus = response.hardDrives.reduce((acc, disk) => {
        // Hard drives do not always have a loadingStatus attr
        if (disk.loadingStatus && disk.loadingStatus !== expectedValue) { acc = disk.loadingStatus; }
        return acc;
      }, expectedValue);


      if (diskStatus !== expectedValue) { return diskStatus; }

      return expectedValue;

    }
  })
);

const waitForPublished = module.exports.waitForPublished = (appId) => (
  waitFor({
    expectedValue: true,
    method:        isApplicationPublished,
    methodArgs:    { appId },
    targetId:      appId,
    targetName:    'Application',
    targetValue:   (res) => res.value,
  })
);

const waitForImageState = module.exports.waitForImageState = (imageId, expectedValue) => (
  waitFor({
    expectedValue,
    maxTries:    120,
    method:      getImage,
    methodArgs:  { imageId },
    targetId:    imageId,
    targetName:  'Image',
    targetValue: (res) => res.loadingStatus,
  })
);

const waitForNotification = module.exports.waitForNotification = (appId, targetId, eventType, startTime) => (
  waitFor({
    expectedValue: eventType,
    maxTries:      120,
    method:        pageNotifications,
    methodArgs:    {
      paging: {
        startRecord: 0,
        pageSize:    100,
      },

      sorting: {
        sortOrder: 'desc',
        propertyName: 'eventTimeStamp',
      },

      filter: {
        criteria: {
          id: 0,
          type: 'COMPLEX',
          operator: 'And',
          criteria: [
            { id: 0, type: 'SIMPLE', index: 1, operator: 'Equals', propertyName: 'appId', operand: appId },
            { type: 'SIMPLE', index: 2, operator: 'Equals', propertyName: 'eventType', operand: eventType },
            { type: 'SIMPLE', index: 3, operator: 'GreaterThan', propertyName: 'eventTimeStamp', operand: new Date(startTime).valueOf() },
          ],
        },
      },
    },
    targetId:    targetId,
    targetName:  'Entity',
    targetValue: (res) => {
      const matchingNotifications = res.content.filter((n) => n.eventProperties.find((e) => e.value === targetId) !== undefined);

      if (matchingNotifications.length) { return eventType; }

      return false;
    },
  })
);
