import {LogEntity} from '../model/logEntity';

export interface LogState {
  logsArray: Array<LogEntity>;
}

export const INITIAL_STATE: LogState = {
  logsArray: [],
};
