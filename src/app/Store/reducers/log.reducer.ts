import * as _ from 'lodash';
import {INITIAL_STATE, LogState} from '../main.state';
import {
  Add_LOG,
  ADD_LOG_OFFLINE_ACTION,
  ADD_LOG_OFFLINE_COMMIT_ACTION,
  ADD_LOG_OFFLINE_ROLLBACK_ACTION,
  ADD_LOG_SUCCESS,
  ADD_MULTI_LOGS
} from '../actions/log.actions';
import {AppAction} from '../actions/action';


export function logReducer(state: LogState = INITIAL_STATE, action): LogState {
  // console.log('00000000');
  switch (action.type) {

    case Add_LOG:
    case ADD_LOG_OFFLINE_ACTION:
      const newLogArray = state.logsArray ? [...state.logsArray, action.payload] : [action.payload];
      // console.log('11111111111111', action.payload, newLogArray);
      return {
        logsArray: newLogArray
      };

    case ADD_MULTI_LOGS:
      const newLogArray2 = [...state.logsArray, ...action.payload];
      return {
        logsArray: newLogArray2
      };

    case ADD_LOG_SUCCESS:
      // console.log('2222222222222');
      return state;

    case ADD_LOG_OFFLINE_COMMIT_ACTION:
      const foundLog = _.find( state.logsArray , (logElement) => logElement.id === action.meta.logEntity.id);
      foundLog.calculated = action.payload.title.slice(0, 30);
      console.log('2222222222222', action , foundLog);
      return {
        logsArray: [...state.logsArray]
      };

    case ADD_LOG_OFFLINE_ROLLBACK_ACTION:
      _.remove(state.logsArray, (logElement) => logElement.id === action.meta.logEntity.id);
      return {
        logsArray: [...state.logsArray]
      };

    default:
      return state;
  }
}

