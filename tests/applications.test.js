// Applications

const nock = require('nock');

const n = require('./makeNocks');
const f = require('./fixtures/applications');
const r = require('..');

const basePath = '/applications';
const appId = f.baseApplication.id;

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
    value: 'Some documentation'
  };

  n.makeRavelloPOSTNock(`${basePath}/${appId}/documentation`, payload, payload);

  return r.createApplicationDocumentation(payload, [ appId ]).then((response) => {
    expect(response).toEqual(payload);
  });
});

test('create application task', () => {
  const payload = {
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

  return r.createApplicationTask(payload, [ appId ]).then((response) => {
    expect(response).toEqual(response);
  });
});

test('delete all application tasks', () => {
  n.makeRavelloDELETENock(`${basePath}/${appId}/tasks`);

  return r.deleteAllApplicationTasks(null, [ appId ]).then((response) => {
    expect(response).toEqual(204);
  });
});

test('delete application', () => {
  n.makeRavelloDELETENock(`${basePath}/${appId}`);

  return r.deleteApplication(null, [ appId ]).then((response) => {
    expect(response).toEqual(204);
  });
});

test('get application', () => {
  n.makeRavelloGETNock(`${basePath}/${appId}`, f.baseApplication);

  return r.getApplication(null, [ appId ]).then((response) => {
    expect(response).toEqual(f.baseApplication);
  });
});

test('get application deployment cost', () => {
  n.makeRavelloPOSTNock(`${basePath}/${appId};deployment/calcPrice`, '', f.deploymentPrice);

  return r.getApplicationDeploymentCost(null, [ appId ]).then((response) => {
    expect(response).toEqual(f.deploymentPrice);
  });
});

test('get application design cost', () => {
  const payload = {
    "optimizationLevel" : "PERFORMANCE_OPTIMIZED"
  };

  n.makeRavelloPOSTNock(`${basePath}/${appId};design/calcPrice`, payload, f.designPrice);

  return r.getApplicationDesignCost(payload, [ appId ]).then((response) => {
    expect(response).toEqual(f.designPrice);
  });
});

test('get application documentation', () => {
  const docs = {
    value: 'Some documentation'
  };

  n.makeRavelloGETNock(`${basePath}/${appId}/documentation`, docs);

  return r.getApplicationDocumentation(null, [ appId ]).then((response) => {
    expect(response).toEqual(docs);
  });
});

test('get application task', () => {
  n.makeRavelloGETNock(`${basePath}/${appId}/tasks/${f.task.id}`, f.task);

  return r.getApplicationTask(null, [ appId, f.task.id ]).then((response) => {
    expect(response).toEqual(f.task);
  });
});

test('is application published', () => {
  const published = { value: true };

  n.makeRavelloGETNock(`${basePath}/${appId}/isPublished`, published);

  return r.isApplicationPublished(null, [ appId ]).then((response) => {
    expect(response).toEqual(published);
  });
});

test('list application publish locations', () => {
  n.makeRavelloPOSTNock(`${basePath}/${appId}/findPublishLocations`, '', f.publishLocations);

  return r.listApplicationPublishLocations(null, [ appId ]).then((response) => {
    expect(response).toEqual(f.publishLocations);
  });
});

test('list application tasks', () => {
  n.makeRavelloGETNock(`${basePath}/${appId}/tasks`, [f.task]);

  return r.listApplicationTasks(null, [ appId ]).then((response) => {
    expect(response).toEqual([f.task]);
  });
});

test('publish application', () => {
  const payload = {
    "optimizationLevel": "PERFORMANCE_OPTIMIZED",
  };

  n.makeRavelloPOSTNock(`${basePath}/${appId}/publish`, payload, '');

  return r.publishApplication(payload, [ appId ]).then((response) => {
    expect(response).toEqual(201);
  });
});

test('publish application updates', () => {
  const res = { "completedSuccessfuly": "true" };

  n.makeRavelloPOSTNock(`${basePath}/${appId}/publishUpdates`, '', res);

  return r.publishApplicationUpdates(null, [ appId ]).then((response) => {
    expect(response).toEqual(res);
  });
});

test('reset application disks', () => {
  const res = { "completedSuccessfuly": "true" };

  n.makeRavelloPOSTNock(`${basePath}/${appId}/resetDisks`, '', res);

  return r.resetApplicationDisks(null, [ appId ]).then((response) => {
    expect(response).toEqual(res);
  });
});

test('restart application', () => {
  const res = { "completedSuccessfuly": "true" };

  n.makeRavelloPOSTNock(`${basePath}/${appId}/restart`, '', res);

  return r.restartApplication(null, [ appId ]).then((response) => {
    expect(response).toEqual(res);
  });
});

test('set application expiration', () => {
  const payload = {
    "expirationFromNowSeconds": 7200
  };

  n.makeRavelloPOSTNock(`${basePath}/${appId}/setExpiration`, payload, 1514516728800);

  return r.setApplicationExpiration(payload, [ appId ]).then((response) => {
    expect(response).toEqual(1514516728800);
  });
});

test('start application', () => {
  const res = { "completedSuccessfuly": "true" };

  n.makeRavelloPOSTNock(`${basePath}/${appId}/start`, '', res);

  return r.startApplication(null, [ appId ]).then((response) => {
    expect(response).toEqual(res);
  });
});

test('stop application', () => {
  const res = { "completedSuccessfuly": "true" };

  n.makeRavelloPOSTNock(`${basePath}/${appId}/stop`, '', res);

  return r.stopApplication(null, [ appId ]).then((response) => {
    expect(response).toEqual(res);
  });
});

xtest('update application', () => {
  const payload = {
    name: 'Updated Application',
    design: {},
  };

  const response = { ...f.baseApplication, name: 'Updated Application', version: 2 };

  n.makeRavelloPUTNock(basePath, payload, response);

  return r.updateApplication(payload, [ appId ]).then((response) => {
    expect(response).toEqual({ ...f.baseApplication, version: 2 });
  });
});

xtest('update application documentation', () => {

  return r.updateApplicationDocumentation().then((response) => {
    expect(response).toEqual([f.baseApplication]);
  });
});

xtest('update application task', () => {

  return r.updateApplicationTask().then((response) => {
    expect(response).toEqual([f.baseApplication]);
  });
});
