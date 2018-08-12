import {LogEntity} from '../model/logEntity';
import {Outpost} from '../model/outpost';

export interface AppState {
  outpostList: Array<Outpost>;
}

export interface LogState {
  logsArray: Array<LogEntity>;
}

export const INITIAL_APP_STATE: AppState = {
  outpostList: [],
};

export const INITIAL_STATE: LogState = {
  logsArray: [],
};
