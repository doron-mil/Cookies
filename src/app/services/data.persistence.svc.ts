import {Injectable} from '@angular/core';
import idb, {DB} from 'idb';
import {OutpostsService} from './outposts.service';
import {Outpost} from '../model/outpost';
import {take} from 'rxjs/operators';
import {LogEntity} from '../model/logEntity';
import {LogState} from '../Store/main.state';
import {NgRedux} from '@angular-redux/store';

@Injectable({
  providedIn: 'root'
})
export class DataPersistenceSvc {

  dbName: string = 'test-db-data';
  dataStoreName: string = 'outpost-table';
  logStoreName: string = 'log-table';

  constructor(
    private store: NgRedux<LogState>, private outpostsService: OutpostsService) {
  }

  openDb(): Promise<DB> {
    return idb.open(this.dbName, 1, (upgradeDb) => {
      switch (upgradeDb.oldVersion) {
        case 0:
          console.log('Creating the products object store001');
          upgradeDb.createObjectStore(this.dataStoreName, {keyPath: 'name'});
          upgradeDb.createObjectStore(this.logStoreName, {keyPath: 'id'});
          break;
        case 1:
          console.log('Upgrading from ver. 1');
          break;
      }
    });
  }

  // getState(store: Store<AppState>): AppState {
  //   let state: AppState;
  //
  //   // store.take(1).subscribe(s => state = s);
  //
  //   return state;
  // }

  data2Db() {
    const statePromise = this.store.select((state: LogState) => state)
      .pipe(take(1)).toPromise();

    const dbPromise = this.openDb();

    Promise.all([statePromise, dbPromise]).then((valueArray) => {
      const db = valueArray[1];
      const tx = db.transaction(this.dataStoreName, 'readwrite');
      const store = tx.objectStore(this.dataStoreName);
      // const cahcheObject = {name: 'nameTest', location: 'Atlanta', supplyMeter: 40};
      const outpostsList = this.outpostsService.getOutpostsList();

      outpostsList.forEach((outpost) => {
        store.add(outpost);
      });

      const logTx = db.transaction(this.logStoreName, 'readwrite');
      const logStore = logTx.objectStore(this.logStoreName);
      // const cahcheObject = {id: 1, name: 'nameTest', location: 'Atlanta', supplyMeter: 40};
      // logStore.add(cahcheObject);
      const entities = valueArray[0];
      let count = 1;
      let logEntity;
      // console.log('bbbbb', entities, entities[1]);
      while (logEntity = entities[count]) {
        console.log('aaaaaa', logEntity);
        logStore.add(logEntity);
        count++;
      }
      // console.log('aaaaaa', this.type(valueArrayElement), valueArrayElement);
    });
  }

  type(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
  }


  Db2data(): Promise<any> {
    const retLogPromise = new Promise<Outpost[]>((resolve, reject) => {

      const dbPromise = this.openDb();

      dbPromise.then((db) => {

        const tx = db.transaction(this.logStoreName, 'readonly');
        const store = tx.objectStore(this.logStoreName);

        store.getAll().then((logList) => {
          // console.log('aaaaaa', logList);
          resolve(logList);
          // this.store.dispatch(new AddMultiLogs(logList));
        });

      });


    });

    const retPromise = new Promise<Outpost[]>((resolve, reject) => {
      const dbPromise = this.openDb();

      dbPromise.then((db) => {

        const tx = db.transaction(this.dataStoreName, 'readonly');
        const store = tx.objectStore(this.dataStoreName);

        store.getAll().then((outpostsList) => {
          console.log('aaaaaa', outpostsList);
          resolve(outpostsList);
          this.outpostsService.setOutpostsList(outpostsList);
        });

      });
    });
    return Promise.all([retPromise, retPromise]);
  }

  deleteDatabase() {
    window.indexedDB.deleteDatabase(this.dbName);
  }
}
