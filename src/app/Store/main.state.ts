import {LogEntity} from '../model/logEntity';
import {Outpost} from '../model/outpost';

export interface LogState {
  outpostList: Array<Outpost>;
  logsArray: Array<LogEntity>;
}

export const INITIAL_STATE: LogState = {
  outpostList: [],
  logsArray: [],
};
