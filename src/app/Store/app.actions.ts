import {LogEntity} from '../model/logEntity';

export interface Action {
  type: string;
  payload: any;
}

// define action types
export enum AppActionTypes {
  AddLog = '[App] Add Log',
  AddMultiLogs = '[App] Add Multi Logs',
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

export class AddMultiLogs implements Action {
  public type: string;
  public payload: LogEntity[];

  constructor(payload: LogEntity[]) {
    this.type    = AppActionTypes.AddMultiLogs;
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
