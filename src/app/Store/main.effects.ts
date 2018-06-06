import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AddLog, AddLogSuccess, AppActionTypes} from './app.actions';
import {filter, map, tap} from 'rxjs/operators';

@Injectable()
export class MainEffects {

  constructor(private actions$: Actions) {
  }

  @Effect()
  addLog = this.actions$.pipe(
    ofType(AppActionTypes.AddLog),
    tap(action => {
      // console.log('aaaaz', action);
    }),
    map(() => (new AddLogSuccess()))
    // filter((() => false))
  );

  // @Effect()
  // addLogSuccess = this.actions$.pipe(
  //   ofType(AppActionTypes.AddLogSuccess),
  //   tap(action => {
  //     console.log('ccccc', action);
  //   }),
  //   filter((() => false))
  // );

  // @Effect()
  // addLog = this.actions$.ofType(SelectOfficeActions.LOAD_FAIL)
  //   .do(() => {
  //     alert('Error! No offices found!'); // I keep entering here
  //   })
  //   .filter(() => false);


}
