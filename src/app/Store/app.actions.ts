import {Action} from '@ngrx/store';
import {LogEntity} from '../model/logEntity';

// define action types
export enum AppActionTypes {
  AddLog = '[App] Add Log',
  AddLogSuccess = '[App] Add Log Success'
}

// define action constructors
export class AddLog implements Action {
  public type: string;
  public payload: LogEntity;

  constructor(payload: LogEntity) {
    this.type    = AppActionTypes.AddLog;
    this.payload = payload;
  }
}

export class AddLogSuccess implements Action {
  public type: string;
  public payload: any;

  constructor() {
    this.type    = AppActionTypes.AddLogSuccess;
  }
}


// define App Actions type
export type AppActions = AddLog| AddLogSuccess ;
