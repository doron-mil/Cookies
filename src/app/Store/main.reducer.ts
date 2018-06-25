import {INITIAL_STATE, LogState} from './main.state';
import {LogEntity} from '../model/logEntity';
import {Action} from 'redux';
import {Add_LOG, ADD_LOG_SUCCESS, ADD_MULTI_LOGS} from './actions/log.actions';
import {ADD_OUTPOST} from './actions/outpost.actions';

export interface AppAction extends Action {
  payload: any;
}

export function mainReducer(state: LogState = INITIAL_STATE, action: AppAction): LogState {
  // console.log('00000000');
  switch (action.type) {

    case Add_LOG:
      // console.log('11111111111111', logState);
      const newLogArray = state.logsArray ? [...state.logsArray, action.payload] : [action.payload];
      return {
        outpostList: state.outpostList,
        logsArray: newLogArray
      };

    case ADD_MULTI_LOGS:
      const newLogArray2 = [...state.logsArray, ...action.payload];
      return {
        outpostList: state.outpostList,
        logsArray: newLogArray2
      };

    case ADD_OUTPOST:
      const newOutpostArray = [...(state.outpostList ? state.outpostList : []), action.payload];
      return {
        outpostList: newOutpostArray,
        logsArray: state.logsArray
      };

    case ADD_LOG_SUCCESS:
      // console.log('2222222222222');
      return state;

    default:
      return state;
  }
}

