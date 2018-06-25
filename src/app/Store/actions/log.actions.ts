import {LogEntity} from '../../model/logEntity';
import {OUTPOST_FEATURE} from './outpost.actions';

export const LOG_FEATURE = '[Logs]';

// define action types
export const Add_LOG = `${LOG_FEATURE} ADD`;
export const ADD_LOG_SUCCESS = `${LOG_FEATURE} SUCCESS `;
export const ADD_MULTI_LOGS   = `${LOG_FEATURE} ADD MULTI LOGS`;

// define action constructors
export const addLogAction = (logEntity: LogEntity) => ({
  type: Add_LOG,
  payload: logEntity,
  meta: { feature: LOG_FEATURE},
});

export const addMultiLogs = (logEntities: LogEntity[]) => ({
  type: ADD_MULTI_LOGS,
  payload: logEntities,
  meta: { feature: LOG_FEATURE},
});

export const addLogSuccess = () => ({
  type: ADD_LOG_SUCCESS,
  meta: { feature: LOG_FEATURE},
});



