import {Injectable} from '@angular/core';
import {Outpost} from '../model/outpost';
import {LogState} from '../Store/main.state';
import {addLotsOfOutpostsAction, addOutpostAction} from '../Store/actions/outpost.actions';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {NgRedux} from '@angular-redux/store';
import {Add_LOG} from '../Store/actions/log.actions';

@Injectable({
  providedIn: 'root'
})
export class NetworkResolver {

  offlineCallback: (isOnline: boolean) => {};
  private _networkOn: boolean = false;

  constructor() {
  }

  get networkOn(): boolean {
    return this._networkOn;
  }

  set networkOn(value: boolean) {
    this._networkOn = value;
  }

  toggleNetwork = () => {
    this.networkOn = !this.networkOn;

    this.offlineCallback( this.networkOn );
    return this.networkOn;
  };

  detectNetwork = (callback) => {
    console.log('detectNetwork');
    this.offlineCallback = callback ;
  };
}


