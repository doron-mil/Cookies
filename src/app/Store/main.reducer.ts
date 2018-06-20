import {AppActions, AppActionTypes} from './app.actions';
import {INITIAL_STATE, LogState} from './main.state';
import {LogEntity} from '../model/logEntity';


export function mainReducer(state: LogState = INITIAL_STATE, action: AppActions): LogState {
  // console.log('00000000');
  switch (action.type) {

    case AppActionTypes.AddLog:

      // console.log('11111111111111', logState);
      const newLogArray = [...state.logsArray, action.payload];
      return {
        logsArray: newLogArray
      };

    case AppActionTypes.AddMultiLogs:


      const newLogArray2 = [...state.logsArray, ...action.payload];
      return {
        logsArray: newLogArray2
      };

    case AppActionTypes.AddLogSuccess:

      // console.log('2222222222222');
      return state;

    default:
      return state;
  }
}

