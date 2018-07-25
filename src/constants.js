// src/constants

const actions = module.exports.actions = {
  POWEROFF:        'poweroff',
  PUBLISH_UPDATES: 'publishUpdates',
  REDEPLOY:        'redeploy',
  REPAIR:          'repair',
  RESET_DISKS:     'resetDisks',
  RESTART:         'restart',
  SHUTDOWN:        'shutdown',
  START:           'start',
  STOP:            'stop',
};

const httpMethods = module.exports.httpMethods = {
  DELETE: 'DELETE',
  GET:    'GET',
  PATCH:  'PATCH',
  POST:   'POST',
  PUT:    'PUT',
};

const vmStates = module.exports.vmStates = {
  ERROR:            'ERROR',
  ERROR_DEPLOY:     'ERROR_DEPLOY',
  ERROR_TERMINATE:  'ERROR_TERMINATE',
  ERROR_UNKNOWN:    'ERROR_UNKNOWN',
  PUBLISHING:       'PUBLISHING',
  REPAIRING:        'REPAIRING',
  RESTARTING:       'RESTARTING',
  RESETTING_DISKS:  'RESETTING_DISKS',
  STARTED:          'STARTED',
  STARTING:         'STARTING',
  STOPPED:          'STOPPED',
  STOPPING:         'STOPPING',
  TERMINATED:       'TERMINATED',
  TERMINATING:      'TERMINATING',
  UNKNOWN:          'UNKNOWN',
  UPDATING:         'UPDATING',
  WAITING_TO_START: 'WAITING_TO_START',
  WAITING_TO_STOP:  'WAITING_TO_STOP',
};

const loadingStatuses = module.exports.loadingStatuses = {
  DELETED:         'DELETED',
  DELETING:        'DELETING',
  DONE:            'DONE',
  ERROR:           'ERROR',
  ERROR_UPLOADING: 'ERROR_UPLOADING',
  PARSING:         'PARSING',
  PAUSED:          'PAUSED',
  SAVING:          'SAVING',
  UNKNOWN:         'UNKNOWN',
  UPLOADING:       'UPLOADING',
};

const pricing = module.exports.pricing = {
  R1:                   'R1',
  R1_vCPU:              2,
  R1_GB:                4,
  R1_COST:              0.204,
  R2:                   'R2',
  R2_vCPU:              2,
  R2_GB:                8,
  R2_COST:              0.3825,
  GB_VOLUME_STORAGE:    0.0002812,
  COMPUTE_MINIMUM_COST: 0.425,
}
