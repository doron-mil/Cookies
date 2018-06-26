import {INITIAL_STATE, LogState} from '../main.state';
import {Add_LOG, ADD_LOG_SUCCESS, ADD_MULTI_LOGS} from '../actions/log.actions';
import {AppAction} from '../actions/action';


export function logReducer(state: LogState = INITIAL_STATE, action: AppAction): LogState {
  // console.log('00000000');
  switch (action.type) {

    case Add_LOG:
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

    default:
      return state;
  }
}

