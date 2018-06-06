import {Component} from '@angular/core';
import {LogState} from './Store/main.state';
import {ActionsSubject, select, Store} from '@ngrx/store';
import {selectAll, addLogsStateSelector, addLogsStateSelector2} from './Store/main.reducer';
import {filter, map, reduce, tap} from 'rxjs/operators';
import {Actions, ofType} from '@ngrx/effects';
import {AddLogSuccess, AppActions, AppActionTypes} from './Store/app.actions';
import {AppState} from './app.module';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  logText: string;

  constructor(private store: Store<AppState>) {
    this.logText = 'start';

    this.store.select(mapToDataToSources).pipe(
      // map(state => {
      //   console.log('cccccccc', state.mainReducer.entities);
      //   return state.mainReducer.entities;
      // }),
      map(state => {
        const ent = (state.mainReducer.ids as number[]).reduce(
          (res, id) => res = state.mainReducer.entities[id].content + '\n' + res, '');
        // console.log('cccccccc', state.mainReducer.entities, ent);
        return ent;
      }),
    ).subscribe((aaa) => this.logText = aaa);

    // this.store.select(addLogsStateSelector2).pipe(
    //   map(state => {
    //     const ent = state ;
    //     // const ent = state.reduce(
    //     //         (res, id) => res = state.mainReducer.entities[id].content + '\n' + res , '');
    //     console.log('cccccccc', ent);
    //     return ent;
    //   }),
    // ).subscribe((aaa) => console.log('bbbbbb', aaa));

    // this.store.select(AppActionTypes.AddLogSuccess).pipe( tap((aaa) => console.log('bbbbbb', aaa)))
    //   .subscribe((aaa) => console.log('bbbbbb', aaa));
  }


  // Working !!!!
  // constructor(private actionsSubj: ActionsSubject) {
  //   this.logText = 'start';
  //
  //   this.logText = actionsSubj.subscribe(data => {
  //     if(data.type === AppActionTypes.AddLog) {
  //       console.log('bbbbbb' , data );
  //     }
  //   });
  // }


  reset() {
    this.store.select(mapToDataToSources).subscribe((aaa) => console.log('ccccc', aaa));
    console.log('aaaa');
  }
}

export function mapToDataToSources(state: AppState): AppState {
  // console.log(state);
  return state;
}
