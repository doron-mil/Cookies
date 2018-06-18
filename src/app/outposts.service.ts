import {Injectable} from '@angular/core';
import {Outpost} from './model/outpost';
import {LogState} from './Store/main.state';
import {Store} from '@ngrx/store';
import {AddLog} from './Store/app.actions';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OutpostsService {

  static nextLogId: number = 1;

  outpostList: Outpost[] = new Array<Outpost>();

  constructor(private http: HttpClient, private store: Store<LogState>) {
  }

  addOutpost(outpost: Outpost) {
    this.outpostList.push(outpost);

    const newID = OutpostsService.nextLogId++;
    const logMsg = 'Added new outpost id = ' + newID + ', name = ' + outpost.name;
    const url = 'https://jsonplaceholder.typicode.com/posts/' + outpost.name;

    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log('fetch => json :', json);
        let titleText = json.title;
        if (titleText) {
          titleText = titleText.slice(0, 30);
        }
        return titleText;
      })
      .catch(err => 'NO CONNECTION')
      .then(title => {
        this.store.dispatch(
          new AddLog(
            {
              id: newID,
              content: logMsg,
              calculated: title,
            }));
      });

    // ************* Working
    // this.http.get<{ title }>(url)
    //   .subscribe(response => {
    //     let titleText = response.title;
    //     if (titleText) {
    //       titleText = titleText.slice(0, 30);
    //     }
    //     this.store.dispatch(
    //       new AddLog(
    //         {
    //           id: newID,
    //           content: logMsg,
    //           calculated: titleText,
    //         }))
    //     ;
    //
    //     // console.log('aaaaaaa' , response);
    //   });

    // this.store.dispatch(
    //   new AddLog(
    //     {
    //       id: newID,
    //       content: logMsg,
    //       calculated: url.slice(0, 30)
    //     }));


    // fetch('https://jsonplaceholder.typicode.com/posts/' + newID)
    //   .then(response => response.json())
    //   .then(json => {
    //     let titleText = json.title;
    //     if (titleText) {
    //       titleText = titleText.slice(0, 30);
    //     }
    //     this.store.dispatch(
    //       new AddLog(
    //         {
    //           id: newID,
    //           content: logMsg,
    //           calculated: titleText,
    //         }));
    //   });
  }

  getOutpostsList(): Outpost[] {
    return this.outpostList;
  }
}
