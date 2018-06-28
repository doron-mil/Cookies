import {LogEntity} from '../../model/logEntity';
import {OUTPOST_FEATURE} from './outpost.actions';

export const LOG_FEATURE = '[LOGS]';
export const LOG_OFFLINE_FEATURE = '[LOGS-OFFLINE]';

// define action types
export const Add_LOG = `${LOG_FEATURE} ADD`;
export const ADD_LOG_SUCCESS = `${LOG_FEATURE} SUCCESS `;
export const ADD_MULTI_LOGS = `${LOG_FEATURE} ADD MULTI LOGS`;

export const ADD_LOG_OFFLINE_ACTION = `${LOG_OFFLINE_FEATURE} ADD_OFFLINE`;
export const ADD_LOG_OFFLINE_COMMIT_ACTION = `${LOG_OFFLINE_FEATURE} ADD_OFFLINE_COMMIT`;
export const ADD_LOG_OFFLINE_ROLLBACK_ACTION = `${LOG_OFFLINE_FEATURE} ADD_OFFLINE_ROLLBACK`;
export const ADD_LOG_OFFLINE_BULK_ACTION = `${LOG_OFFLINE_FEATURE} ADD_OFFLINE_BULK`;

// define action constructors

export const addLogActionOffline = (logEntity: LogEntity, url: string) => ({
  type: ADD_LOG_OFFLINE_ACTION,
  payload: logEntity,
  meta: {
    feature: LOG_OFFLINE_FEATURE,
    offline: {
      // the network action to execute:
      effect: {url: url, method: 'GET', body: null},
      // action to dispatch when effect succeeds:
      commit: {type: ADD_LOG_OFFLINE_COMMIT_ACTION, meta: {feature: LOG_OFFLINE_FEATURE, logEntity}},
      // action to dispatch if network action fails permanently:
      rollback: {type: ADD_LOG_OFFLINE_ROLLBACK_ACTION, meta: {feature: LOG_OFFLINE_FEATURE, logEntity}}
    }
  },
});

export const addBulkLogActionOffline = (logEntities: LogEntity[]) => ({
  type: ADD_LOG_OFFLINE_BULK_ACTION,
  meta: {feature: LOG_OFFLINE_FEATURE},
  payload: logEntities,
});


export const addLogAction = (logEntity: LogEntity) => ({
  type: Add_LOG,
  payload: logEntity,
  meta: {
    feature: LOG_FEATURE,
  },
});

export const addMultiLogs = (logEntities: LogEntity[]) => ({
  type: ADD_MULTI_LOGS,
  payload: logEntities,
  meta: {
    feature: LOG_FEATURE,
  },
});

export const addLogSuccess = () => ({
  type: ADD_LOG_SUCCESS,
  meta: {feature: LOG_FEATURE},
});




