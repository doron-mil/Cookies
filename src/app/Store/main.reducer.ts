import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppActions, AppActionTypes} from './app.actions';
import {initLogState, logAdapter, LogState} from './main.state';
import {AppState} from '../app.module';
import {LogEntity} from '../model/logEntity';
import {Dictionary} from '@ngrx/entity/src/models';


export function mainReducer(state: LogState = initLogState, action: AppActions): LogState {
  // console.log('00000000');
  switch (action.type) {

    case AppActionTypes.AddLog:

      const logState = logAdapter.addOne(action.payload, state);
      // console.log('11111111111111', logState);
      return logState;

    case AppActionTypes.AddLogSuccess:

      // console.log('2222222222222');
      return state;

    default:
      return state;
  }
}

// selectors
export const addLogsStateFeatureSelector = createFeatureSelector<LogState>('logger');
export const addLogsStateSelector = createSelector(addLogsStateFeatureSelector, (state) => state);

export const addLogsStateSelector2 = createSelector((state: AppState) => state.mainReducer.entities, (state) => state);

export const addLogsStateSelector3 = createSelector(
  (state: AppState) => state.mainReducer.ids,
  (state: AppState) => state.mainReducer.entities,
  (ids: number[], entities: Dictionary<LogEntity>) => {
    const logsArray = ids.reduce((res, id ) => {
      res.push(entities[id].content);
      return res;
    }, []);
    // console.log('--------------- ', logsArray);
    return logsArray;
  });

// ids.reduce(
//   (res, id) => res =  entities[id].content + '\n' + res , ''));

// export const getPortfoliosState = (state: LogState) => state.ids;
// export const getPortfolioIds = createSelector(getPortfoliosState, (state: State) => state );

export const {selectAll} = logAdapter.getSelectors(addLogsStateSelector);
