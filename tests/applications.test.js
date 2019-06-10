// Applications

const nock = require('nock');

const n = require('./makeNocks');
const f = require('./fixtures/applications');
const r = require('..');

const basePath = '/applications';
const appId = f.baseApplication.id;

r.configure({ credentials: { domain: 'earth', password: 'password', username: 'human' } });

beforeEach(() => {
  n.makeAuthorizationNock();
});

test('list applications', () => {

  n.makeRavelloGETNock(basePath, [f.baseApplication]);

  return r.listApplications().then((response) => {
    expect(response).toEqual([f.baseApplication]);
  });
});


test('create application', () => {
  const payload = {
    name: 'Application',
    design: {},
  };

  n.makeRavelloPOSTNock(basePath, payload, f.baseApplication);

  return r.createApplication(payload).then((response) => {
    expect(response).toEqual(f.baseApplication);
  });
});


test('create application documentation', () => {
  const payload = {
    appId,
    value: 'Some documentation'
  };

  n.makeRavelloPOSTNock(`${basePath}/${appId}/documentation`, payload, payload);

  return r.createApplicationDocumentation(payload).then((response) => {
    expect(response).toEqual(payload);
  });
});

test('create application task', () => {
  const payload = {
    appId,
    action: 'START'
  };

  const response = {
    "action": "START",
    "args": {
      "appId": appId
    }, 
    "entityId": 11603906, 
    "entityType": "APPLICATION", 
    "id": 11169911, 
    "scheduleInfo": {
      "start": 1111504098805,
      "timezone": "UTC"
    }
  };

  n.makeRavelloPOSTNock(`${basePath}/${appId}/tasks`, payload, response);

  return r.createApplicationTask(payload).then((response) => {
    expect(response).toEqual(response);
  });
});

test('delete all application tasks', () => {
  n.makeRavelloDELETENock(`${basePath}/${appId}/tasks`);

  return r.deleteAllApplicationTasks({ appId }).then((response) => {
    expect(response).toEqual(true);
  });
});

test('delete application', () => {
  n.makeRavelloDELETENock(`${basePath}/${appId}`);

  return r.deleteApplication({ appId }).then((response) => {
    expect(response).toEqual(true);
  });
});

test('get application', () => {
  n.makeRavelloGETNock(`${basePath}/${appId}`, f.baseApplication);

  return r.getApplication({ appId }).then((response) => {
    expect(response).toEqual(f.baseApplication);
  });
});

test('get application deployment cost', () => {
  const payload = { appId };
  n.makeRavelloPOSTNock(`${basePath}/${appId};deployment/calcPrice`, payload, f.deploymentPrice);

  return r.getApplicationDeploymentCost(payload).then((response) => {
    expect(JSON.parse(response)).toEqual(f.deploymentPrice);
  });
});

test('get application design cost', () => {
  const payload = {
    appId,
    "optimizationLevel" : "PERFORMANCE_OPTIMIZED"
  };

  n.makeRavelloPOSTNock(`${basePath}/${appId};design/calcPrice`, payload, f.designPrice);

  return r.getApplicationDesignCost(payload).then((response) => {
    expect(response).toEqual(f.designPrice);
  });
});

test('get application documentation', () => {
  const docs = {
    appId,
    value: 'Some documentation'
  };

  n.makeRavelloGETNock(`${basePath}/${appId}/documentation`, docs);

  return r.getApplicationDocumentation({ appId }).then((response) => {
    expect(response).toEqual(docs);
  });
});

test('get application task', () => {
  n.makeRavelloGETNock(`${basePath}/${appId}/tasks/${f.task.id}`, f.task);

  return r.getApplicationTask({ appId, taskId: f.task.id }).then((response) => {
    expect(response).toEqual(f.task);
  });
});

test('is application published', () => {
  const published = { value: true };

  n.makeRavelloGETNock(`${basePath}/${appId}/isPublished`, published);

  return r.isApplicationPublished({ appId }).then((response) => {
    expect(response).toEqual(published);
  });
});

test('list application publish locations', () => {
  n.makeRavelloPOSTNock(`${basePath}/${appId}/findPublishLocations`, { appId }, f.publishLocations);

  return r.listApplicationPublishLocations({ appId }).then((response) => {
    expect(response).toEqual(f.publishLocations);
  });
});

test('list application tasks', () => {
  n.makeRavelloGETNock(`${basePath}/${appId}/tasks`, [f.task]);

  return r.listApplicationTasks({ appId }).then((response) => {
    expect(response).toEqual([f.task]);
  });
});

test('publish application', () => {
  const payload = {
    appId,
    "optimizationLevel": "PERFORMANCE_OPTIMIZED",
  };

  n.makeRavelloPOSTNock(`${basePath}/${appId}/publish`, payload, '');

  return r.publishApplication(payload).then((response) => {
    expect(response).toEqual(true);
  });
});

test('publish application updates', () => {
  const res = { "completedSuccessfuly": "true" };

  n.makeRavelloPOSTNock(`${basePath}/${appId}/publishUpdates`, { appId }, res);

  return r.publishApplicationUpdates({ appId }).then((response) => {
    expect(response).toEqual(res);
  });
});

test('reset application disks', () => {
  const res = { "completedSuccessfuly": "true" };

  n.makeRavelloPOSTNock(`${basePath}/${appId}/resetDisks`, { appId }, res);

  return r.resetApplicationDisks({ appId }).then((response) => {
    expect(response).toEqual(res);
  });
});

test('restart application', () => {
  const res = { "completedSuccessfuly": "true" };

  n.makeRavelloPOSTNock(`${basePath}/${appId}/restart`, { appId }, res);

  return r.restartApplication({ appId }).then((response) => {
    expect(response).toEqual(res);
  });
});

test('set application expiration', () => {
  const payload = {
    appId,
    "expirationFromNowSeconds": 7200
  };

  n.makeRavelloPOSTNock(`${basePath}/${appId}/setExpiration`, payload, 1514516728800);

  return r.setApplicationExpiration(payload).then((response) => {
    expect(response).toEqual(1514516728800);
  });
});

test('start application', () => {
  const res = { "completedSuccessfuly": "true" };

  n.makeRavelloPOSTNock(`${basePath}/${appId}/start`, { appId }, res);

  return r.startApplication({ appId }).then((response) => {
    expect(response).toEqual(res);
  });
});

test('stop application', () => {
  const res = { "completedSuccessfuly": "true" };

  n.makeRavelloPOSTNock(`${basePath}/${appId}/stop`, { appId }, res);

  return r.stopApplication({ appId }).then((response) => {
    expect(response).toEqual(res);
  });
});

xtest('update application', () => {
  nock.recorder.rec();

  const payload = {
    appId: 94603906,
    name: 'Updated Application',
    design: {},
  };

  const response = { ...f.baseApplication, name: 'Updated Application', version: 2 };

  n.makeRavelloPUTNock(`${basePath}/${appId}`, payload, response);

  return r.updateApplication(payload).then((response) => {
    expect(response).toEqual({ ...f.baseApplication, version: 2 });
  });
});

xtest('update application documentation', () => {
  // nock.recorder.rec();

  const payload = {
    appId: 94603906,
    value: 'Some updated documentation'
  };

  const response = { value: 'Some updated documentation' };

  n.makeRavelloPUTNock(`${basePath}/${appId}/documentation`, payload, response);

  return r.updateApplicationDocumentation(payload).then((response) => {
    expect(response).toEqual([f.baseApplication]);
  });
});

xtest('update application task', () => {

  return r.updateApplicationTask().then((response) => {
    expect(response).toEqual([f.baseApplication]);
  });
});
