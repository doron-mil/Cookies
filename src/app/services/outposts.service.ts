import {Injectable} from '@angular/core';
import {Outpost} from '../model/outpost';
import {LogState} from '../Store/main.state';
import {AddLog, AppActionTypes} from '../Store/app.actions';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {NgRedux} from '@angular-redux/store';

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
    this.outpostList.push(outpost);

    const newID = OutpostsService.nextLogId++;
    const logMsg = 'Added new outpost id = ' + newID + ', name = ' + outpost.name;
    const url = 'https://jsonplaceholder.typicode.com/posts/' + outpost.name;

    fetch(url)
      .then(response => response.json())
      .then(json => {
        // console.log('fetch => json :', json);
        let titleText = json.title;
        if (titleText) {
          titleText = titleText.slice(0, 30);
        }
        return titleText;
      })
      .catch(err => 'NO CONNECTION')
      .then(title => {
        this.store.dispatch(
          {
            type: AppActionTypes.AddLog,
            payload: {
              id: newID,
              content: logMsg,
              calculated: title,
            }
          });
      });

  }

  getOutpostsList(): Outpost[] {
    return this.outpostList;
  }

  setOutpostsList(aOutpostsList: Outpost[]) {
    this.outpostList = aOutpostsList;
    OutpostsService.changeSubject.next(true);
  }
}
