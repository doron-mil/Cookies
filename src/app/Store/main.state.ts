import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {LogEntity} from '../model/logEntity';

export const logAdapter: EntityAdapter<LogEntity> = createEntityAdapter<LogEntity>();

const logs = {
  ids     : [],
  entities: {}
};

export interface LogState extends EntityState<LogEntity> {}

export const initLogState: LogState = logAdapter.getInitialState(logs);

