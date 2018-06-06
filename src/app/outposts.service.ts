import {Injectable} from '@angular/core';
import {Outpost} from './model/outpost';
import {LogState} from './Store/main.state';
import {Store} from '@ngrx/store';
import {AddLog} from './Store/app.actions';

@Injectable({
  providedIn: 'root'
})
export class OutpostsService {

  static nextLogId: number = 0;

  outpostList: Outpost[] = new Array<Outpost>();

  constructor(private store: Store<LogState>) {
  }

  addOutpost(outpost: Outpost) {
    this.outpostList.push(outpost);

    const newID = OutpostsService.nextLogId++;
    const logMsg = 'Added new outpost id = ' + newID + ', name = ' + outpost.name;
    this.store.dispatch(
      new AddLog(
        {
          id: newID,
          content: logMsg
        }));
  }

  getOutpostsList(): Outpost[] {
    return this.outpostList;
  }
}
