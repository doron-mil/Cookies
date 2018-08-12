import * as _ from 'lodash';
import {Injectable} from '@angular/core';
import {Outpost} from '../model/outpost';
import {LogState} from '../Store/main.state';
import {addLotsOfOutpostsAction, addOutpostAction} from '../Store/actions/outpost.actions';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {NgRedux} from '@angular-redux/store';
import {Add_LOG, addBulkLogActionOffline} from '../Store/actions/log.actions';
import {OfflineAction, OfflineState} from '@redux-offline/redux-offline/lib/types';
import {LogEntity} from '../model/logEntity';
import {apiError} from '../Store/actions/api.actions';

interface EffectEntity {
  effect: any;
  action: OfflineAction;
  // resolve: any;
  // reject: any;
}

@Injectable({
  providedIn: 'root'
})
export class QueueManager {


  constructor(private store: NgRedux<LogState>) {
  }

  enqueue = (array: Array<OfflineAction>,
             item: OfflineAction,
             context: { offline: OfflineState }): Array<OfflineAction> => {
    const itemPayload: LogEntity = item.payload as LogEntity;
    console.log('QueueManager:enqueue - start ', array, itemPayload.id);

    let payloadsArray: Array<LogEntity>;
    if (array.length === 0) {
      array.push( item );
      payloadsArray = new Array < LogEntity >();
    } else {
      payloadsArray = array[0].payload as Array<LogEntity>;
    }
    payloadsArray.push(itemPayload );
    array[0].payload = payloadsArray ;

    console.log('QueueManager:enqueue - end', array);
    return array;
  };
}


