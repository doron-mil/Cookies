import {AppState, INITIAL_APP_STATE } from '../main.state';
import {Add_LOG, ADD_LOG_SUCCESS, ADD_MULTI_LOGS} from '../actions/log.actions';
import {ADD_LOTS_OF_OUTPOSTS, ADD_OUTPOST, ADD_OUTPOSTS_BULK} from '../actions/outpost.actions';
import {AppAction} from '../actions/action';


export function mainReducer(state: AppState = INITIAL_APP_STATE, action: AppAction): AppState {
  // console.log('00000000');
  switch (action.type) {

    case ADD_OUTPOST:
      let newOutpostArray = [...(state.outpostList ? state.outpostList : []), action.payload];
      return {
        outpostList: newOutpostArray,
      };

    case ADD_OUTPOSTS_BULK:
      newOutpostArray = [...(state.outpostList ? state.outpostList : []), ...action.payload];
      return {
        outpostList: newOutpostArray,
      };

    default:
      return state;
  }
}

