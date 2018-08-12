import * as _ from 'lodash';
import {Injectable} from '@angular/core';
import {Outpost} from '../model/outpost';
import {LogState} from '../Store/main.state';
import {addLotsOfOutpostsAction, addOutpostAction} from '../Store/actions/outpost.actions';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {NgRedux} from '@angular-redux/store';
import {Add_LOG, addBulkLogActionOffline} from '../Store/actions/log.actions';
import {OfflineAction} from '@redux-offline/redux-offline/lib/types';
import {LogEntity} from '../model/logEntity';
import {apiError} from '../Store/actions/api.actions';
import {reject} from 'q';

interface EffectEntity {
  effect: any;
  action: OfflineAction;
  // resolve: any;
  // reject: any;
}

@Injectable({
  providedIn: 'root'
})
export class EffectManager {

  resolveArray: Array<EffectEntity> = [];

  constructor(private store: NgRedux<LogState>) {
  }

  effectReconciler = (effect: any, action: OfflineAction): Promise<any> => {
    console.log('***************** effectReconciler', action, effect);
    // this.resolveArray.push({
    //   effect,
    //   action,
    // });
    // const retPromise = new Promise((resolve, reject) => {
    //   resolve(true);
    //   // reject({ type : 'There was a bug in Sync' , syncId : 4444});
    // });
    return fetch(effect.url, {body: effect.body, method: effect.method}).then(response => response.json());
  };

  discard = (error: any, action: OfflineAction, retries: number): boolean => {
    console.log('discard retries = ', retries, error, action);
    return false;
  };

  retry = (action: OfflineAction, retries: number): number | null => {
    console.log('retry retries = ', retries, action);
    return 5000;
  };

  displayAllEffects() {
    console.log('****** displayAllEffects - start', this.resolveArray.length);
    this.resolveArray.forEach((effectEntity) => {
      console.log('displayAllEffects : ', effectEntity);
    });
    console.log('****** displayAllEffects - end');
  }

  resolveAllEffects() {
    const logEntitiesArray: Array<LogEntity> = [];

    this.resolveArray.forEach((effectEntity) => {
      logEntitiesArray.push(effectEntity.action.payload as LogEntity);
    });

    fetch('https://jsonplaceholder.typicode.com/posts/', {method: 'GET'})
      .then(response => response.json())
      .then(response => {

        const postsMap = {};

        _.forEach(response, (record: { id, title }) => {
          postsMap[record.id] = record.title;
        });

        this.generateUpdates(postsMap, logEntitiesArray);

      })
      .catch(error => console.log('resolveAllEffects ERROR', error));


    // this.store.dispatch(addBulkLogActionOffline());
  }

  generateUpdates(postsMap: {}, logEntitiesArray: Array<LogEntity>) {
    logEntitiesArray.forEach((logEntity, index) => {
      logEntity.calculated = postsMap[((logEntity.id + index) % 100)];
    });
    // console.log('bbbbbbbbbb', logEntitiesArray);
    this.store.dispatch(addBulkLogActionOffline(logEntitiesArray));
    this.resolveArray = [];
  }

  clearAllCachedEffects() {
    this.resolveArray = [];
  }
}


