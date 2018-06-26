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
export class OutpostsService {

  public static changeSubject: Subject<boolean> = new Subject();
  static nextLogId: number = 1;

  outpostList: Outpost[] = new Array<Outpost>();

  constructor(private http: HttpClient, private store: NgRedux<LogState>) {
  }

  addOutpost(outpost: Outpost) {
    this.store.dispatch(addOutpostAction(outpost));
  }

  getOutpostsList(): Outpost[] {
    return this.outpostList;
  }

  setOutpostsList(aOutpostsList: Outpost[]) {
    this.outpostList = aOutpostsList;
    OutpostsService.changeSubject.next(true);
  }

  loadBigData() {
    this.store.dispatch(addLotsOfOutpostsAction());
  }
}
