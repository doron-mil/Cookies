import {Component} from '@angular/core';
import {LogState} from './Store/main.state';
import {ActionsSubject, select, Store} from '@ngrx/store';
import {addLogsStateSelector, addLogsStateSelector2, addLogsStateSelector3} from './Store/main.reducer';
import {filter, map, reduce, tap} from 'rxjs/operators';
import {Actions, ofType} from '@ngrx/effects';
import {AddLogSuccess, AppActions, AppActionTypes} from './Store/app.actions';
import {AppState} from './app.module';
import {forEach} from '@angular/router/src/utils/collection';
import {Observable} from 'rxjs';
import idb from 'idb';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  logText: Observable<string>;

  constructor(private store: Store<AppState>) {
    //  this.logText = 'start';

    // this.store.select(mapToDataToSources).pipe(
    //   // map(state => {
    //   //   console.log('cccccccc', state.mainReducer.entities);
    //   //   return state.mainReducer.entities;
    //   // }),
    //   map(state => {
    //     const ent = (state.mainReducer.ids as number[]).reduce(
    //       (res, id) => res = state.mainReducer.entities[id].content + '\n' + res, '');
    //     // console.log('cccccccc', state.mainReducer.entities, ent);
    //     return ent;
    //   }),
    // ).subscribe((aaa) => this.logText = aaa);

    // this.store.select(addLogsStateSelector3).pipe(
    //   map(logsArray => {
    //     const formattedLogs = logsArray.reduce(
    //             (res, log) => res = log + '\n' + res , '');
    //     console.log('cccccccc', formattedLogs);
    //     return formattedLogs;
    //   }),
    // ).subscribe((formattedLogs) => this.logText = formattedLogs);

    this.logText = this.store.select(addLogsStateSelector).pipe(
      map(logsArray => {
        if (!logsArray) {
          return '';
        }
        const formattedLogs = logsArray.reduce(
          (res, log) => res = log.content + ' +++ ' + log.title + '\n' + res, '');
        // console.log('cccccccc', formattedLogs);
        return formattedLogs;
      }),
    );

    // this.store.select(AppActionTypes.AddLogSuccess).pipe( tap((aaa) => console.log('bbbbbb', aaa)))
    //   .subscribe((aaa) => console.log('bbbbbb', aaa));
  }


  // Working !!!!
  // constructor(private actionsSubj: ActionsSubject) {
  //   this.logText = 'start';
  //
  //   this.logText = actionsSubj.subscribe(data => {
  //     if(data.type === AppActionTypes.AddLog) {
  //       console.log('bbbbbb' , data );
  //     }
  //   });
  // }

  resetDB() {
    window.indexedDB.deleteDatabase('test-db1');
  }

  openDb() {
    return idb.open('test-db1', 1, (upgradeDb) => {
      switch (upgradeDb.oldVersion) {
        case 0:
          console.log('Creating the products object store001');
          // upgradeDb.createObjectStore('api-test', {keyPath: 'path'});
          upgradeDb.createObjectStore('api-test-cache', {keyPath: 'path'});
          upgradeDb.createObjectStore('api-test-lru', {keyPath: 'path'});
          upgradeDb.createObjectStore('api-test-age', {keyPath: 'path'});
          break;
        case 1:
          console.log('Creating the products object store111');
          console.log('Creating the products object store');
          break;
      }
    });
  }


  Db2cache() {
    const dbPromise = this.openDb();

    dbPromise.then((db) => {

      chachesArray.forEach((cahchesMeta) => writeToCache(db, cahchesMeta));
    });

  }

  cache2Db() {
    // this.cache2Db_v1();
    // this.cache2Db_v2();
    this.cache2Db_v3();
  }

  cache2Db_v3() {
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
    }

    console.log('IndexedDB is ready !!!');

    const dbPromise = this.openDb();

    dbPromise.then(function (db) {
      chachesArray.forEach((cahchesMeta) => writeToDb(db, cahchesMeta));
    });

    console.log('IndexedDB is ready -------------- end');
  }

  cache2Db_v2() {
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
    }

    console.log('IndexedDB is ready !!!');

    const dbPromise = idb.open('test-db1', 1, (upgradeDb) => {
      switch (upgradeDb.oldVersion) {
        case 0:
          console.log('Creating the products object store001');
          upgradeDb.createObjectStore('api-test', {keyPath: 'path'});
          // upgradeDb.createObjectStore('api-test-cache', {keyPath: 'path'});
          // upgradeDb.createObjectStore('api-test-lru', {keyPath: 'path'});
          // upgradeDb.createObjectStore('api-test-age', {keyPath: 'path'});
          break;
        case 1:
          console.log('Creating the products object store111');
          console.log('Creating the products object store');
          break;
      }
    });

    dbPromise.then(function (db) {
      const chachesArray = [
        {store: 'api-test-cache', cachesName: 'ngsw:1:data:dynamic:api-test-performance:cache'},
        {store: 'api-test-lru', cachesName: 'ngsw:db:ngsw:1:data:dynamic:api-test-performance:lru'},
        {store: 'api-test-age', cachesName: 'ngsw:db:ngsw:1:data:dynamic:api-test-performance:age'},
      ];

      // chachesArray.forEach( (cahchesMeta) => this.writeToDb(cahchesMeta));
      // Updating the Database
      const cacheName = 'ngsw:1:data:dynamic:api-test-performance:cache';

      caches.open(cacheName).then(function (cache) {
        cache.keys().then(function (keys) {
          keys.forEach(function (request, index, array) {
            // console.log('key', index , request, request.json());
            cache.match(request).then((response) => response.blob())
              .then((resBlob) => {
                request.blob().then((reqBlob) => {
                  const cahchObject = {
                    path: request.url,
                    request: reqBlob,
                    response: resBlob
                  };
                  const tx = db.transaction('api-test', 'readwrite');
                  const store = tx.objectStore('api-test');
                  store.add(cahchObject);
                });
                // console.log('cahchObject', singleUrlApi, cahchObject);
              }).catch((err) => console.error('Doron - Error in getting response', err));
          });
        });
        return cache.matchAll();
      }).catch((err) => {
        console.error('Failledddddddddddd to open caches', err);
      });

      // const cahchObject1 = {
      //   path: '1111',
      //   response: '2222'
      // };
      // store.add(cahchObject1);
    });

    console.log('IndexedDB is ready -------------- end');
  }

  cache2Db_v1() {
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
    }

    console.log('IndexedDB is ready !!!');

    const dbPromise = idb.open('test-db1', 1, (upgradeDb) => {
      switch (upgradeDb.oldVersion) {
        case 0:
          console.log('Creating the products object store001');
          upgradeDb.createObjectStore('api-test', {keyPath: 'id'});
          break;
        case 1:
          console.log('Creating the products object store111');
          console.log('Creating the products object store');
          break;
      }

    });

    dbPromise.then(function (db) {
      const tx = db.transaction('api-test', 'readwrite');
      const store = tx.objectStore('api-test');

      const items = [
        {
          name: 'Couch',
          id: 'cch-blk-ma',
          price: 499.99,
          color: 'black',
          material: 'mahogany',
          description: 'A very comfy couch',
          quantity: 3
        },
        {
          name: 'Armchair',
          id: 'ac-gr-pin',
          price: 299.99,
          color: 'grey',
          material: 'pine',
          description: 'A plush recliner armchair',
          quantity: 7
        }];

      return Promise.all(items.map(function (item) {
          console.log('Adding item: ', item);
          return store.add(item);
        })
      ).catch(function (e) {
        tx.abort();
        console.log(e);
      }).then(function () {
        console.log('All items added successfully!');
      });
    });

    console.log('IndexedDB is ready -------------- end');
  }

  setCache() {
    // Updating the cache
    const cacheName = 'ngsw:1:data:dynamic:api-test-performance:cache';
    const pathName = 'posts/';
    const fullPathName = 'https://jsonplaceholder.typicode.com/posts/';

    const pathContent = {userId: 1, id: 4, title: 'Tryout'};
    const data = {userId: 1, id: 2, title: 'My 4 Tests Tittle', body: 'test Body for 4'};
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json; charset=utf-8'});
    const init = {'status': 200, 'statusText': 'OK'};
    const myResponse = new Response(blob, init);

    caches.open(cacheName).then(function (cache) {
      cache.put(pathName + 4, myResponse);
    });

    // Updating the lru
    const lrCacheName = 'ngsw:db:ngsw:1:data:dynamic:api-test-performance:lru';
    const lruPathName = 'lru';
    const lru = {
      head: fullPathName + 4,
      tail: fullPathName + 4,
      count: 1,
      map: [{
        next: null,
        previous: null,
        url: fullPathName + 4
      }]
    };
    const lruBlob = new Blob([JSON.stringify(lru, null, 2)], {type: 'text/plain;charset=UTF-8'});
    const lruInit = {'status': 200, 'statusText': 'OK'};
    const lruResponse = new Response(lruBlob, lruInit);

    caches.open(lrCacheName).then(function (cache) {
      cache.put(lruPathName, lruResponse);
    });

    // Updating the age
    const ageCacheName = 'ngsw:db:ngsw:1:data:dynamic:api-test-performance:age';
    const ageBlob = new Blob([JSON.stringify({age: 1528959454332}, null, 2)], {type: 'text/plain;charset=UTF-8'});
    const ageInit = {'status': 200, 'statusText': 'OK'};
    const ageResponse = new Response(ageBlob, ageInit);
    const agePathName = '/' + fullPathName + 4;

    caches.open(ageCacheName).then(function (cache) {
      cache.put(agePathName, ageResponse);
    });

    console.log('try4');

    // caches.keys().then((cacheNames) => {
    //   cacheNames.forEach(cacheName => console.log('bbbbbbb1', cacheName));
    // });
    // ngsw:db:control
    // ngsw:4918598b85218f79108d42a4c0d07815c702ab25:assets:app:cache
    // ngsw:db:ngsw:4918598b85218f79108d42a4c0d07815c702ab25:assets:app:meta
    // ngsw:4918598b85218f79108d42a4c0d07815c702ab25:assets:assets:cache
    // ngsw:db:ngsw:4918598b85218f79108d42a4c0d07815c702ab25:assets:assets:meta
    // ngsw:1:data:dynamic:api-test-performance:cache
    // ngsw:db:ngsw:1:data:dynamic:api-test-performance:lru
    // ngsw:db:ngsw:1:data:dynamic:api-test-performance:age

    // this.store.select(mapToDataToSources).subscribe((aaa) => console.log('ccccc', aaa));

    // caches.open(cacheName).then(function(cache) {
    //   return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
    //     if (response) {
    //       return response;
    //     }
    //     throw Error('The cached response that was expected is missing.');
    //   });
    // }).catch(function(e) {
    //   // Fall back to just fetch()ing the request if some unexpected error
    //   // prevented the cached response from being valid.
    //   console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
    //   return fetch(event.request);
    // })
  }

  resetCache() {
    caches.keys().then((cacheNames) => {
      cacheNames.forEach(cacheName => caches.delete(cacheName));
    });
  }

}

export function mapToDataToSources(state: AppState): AppState {
  // console.log(state);
  return state;
}

function writeToCache(db, cahchesMeta: { store: string; cachesName: string }) {

  const storeName = cahchesMeta.store;
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);

  const myArr = [];
  ((cacheArray) => {
    store.openCursor().then(function dealWithCurrentCursor(cursor) {
      if (!cacheArray) {
        cacheArray = [];
      }
      if (!cursor) {
        return cacheArray;
      }
      cacheArray.push(cursor.value);
      console.log('1111111111', cursor.key, cacheArray);
      cursor.continue().then(dealWithCurrentCursor);
    }).then(() => {
      cacheArray.forEach((cacheObject) => {
        caches.open(cahchesMeta.cachesName).then((cache) => {
          console.log('2222222222', cacheObject.request, type(cacheObject.response));

          cache.put(cacheObject.request, new Response());
        });
      });
    });
  })(myArr);


  // caches.open(cahchesMeta.cachesName).then((cache) => {
  //   cache.put(cursor.value.request, cursor.value.response);
  // });

}

const chachesArray = [
  {store: 'api-test-cache', cachesName: 'ngsw:1:data:dynamic:api-test-performance:cache'},
  {store: 'api-test-lru', cachesName: 'ngsw:db:ngsw:1:data:dynamic:api-test-performance:lru'},
  {store: 'api-test-age', cachesName: 'ngsw:db:ngsw:1:data:dynamic:api-test-performance:age'},
];

function writeToDb(db, cahchesMeta: { store: string; cachesName: string }) {
  writeToDb_ver1(db, cahchesMeta);
}

function writeToDb_ver2(db, cahchesMeta: { store: string; cachesName: string }) {
  caches.open(cahchesMeta.cachesName).then(function (cache) {
    cache.keys().then(function (keys) {
      keys.forEach(function (request, index, array) {
        // console.log('key', index , request, request.json());
        cache.match(request).then((response) => {
          const cahchObject = {
            path: request.url,
            request: request,
            response: response
          };
          console.log('7777777777777777777', cahchObject);

          const storeName = cahchesMeta.store;
          // console.log('1111111111111111', storeName, db);
          const tx = db.transaction(storeName, 'readwrite');
          const store = tx.objectStore(storeName);
          store.add(cahchObject);
          // console.log('cahchObject', singleUrlApi, cahchObject);
        }).catch((err) => console.error('Doron - Error in getting response', err));
      });
    });
    return cache.matchAll();
  }).catch((err) => {
    console.error('Failledddddddddddd to open caches', err);
  });
}

function writeToDb_ver1(db, cahchesMeta: { store: string; cachesName: string }) {
  caches.open(cahchesMeta.cachesName).then(function (cache) {
    cache.keys().then(function (keys) {
      keys.forEach(function (request, index, array) {
        // console.log('key', index , request, request.json());
        cache.match(request).then((response) => response.blob())
          .then((resBlob) => {
            request.blob().then((reqBlob) => {
              const cahchObject = {
                path: request.url,
                request: reqBlob,
                response: resBlob
              };
              const storeName = cahchesMeta.store;
              // console.log('1111111111111111', storeName, db);
              const tx = db.transaction(storeName, 'readwrite');
              const store = tx.objectStore(storeName);
              store.add(cahchObject);
            });
            // console.log('cahchObject', singleUrlApi, cahchObject);
          }).catch((err) => console.error('Doron - Error in getting response', err));
      });
    });
    return cache.matchAll();
  }).catch((err) => {
    console.error('Failledddddddddddd to open caches', err);
  });

}


function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}
