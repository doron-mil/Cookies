import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {AlertModule, BsDropdownModule} from 'ngx-bootstrap';
import {OutpostAddComponent} from './outpost-add/outpost-add.component';
import {OutpostListComponent} from './outpost-list/outpost-list.component';
import {AppRoutingModule} from './/app-routing.module';
import {MainEffects} from './Store/main.effects';
import {INITIAL_STATE, LogState} from './Store/main.state';
import {AppActions} from './Store/app.actions';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';
import {mainReducer} from './Store/main.reducer';
import {createLogger} from 'redux-logger' ;
import {applyMiddleware, createStore, Store} from 'redux';
import {persistStore, persistReducer} from 'redux-persist' ;
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import {LocalForageStorage} from 'redux-persist/es/types';
import * as localForage from 'localforage';
import {composeWithDevTools} from 'redux-devtools-extension';

// localForage.setItem('key1', 'value1', function (err) {
//   // if err is non-null, we got an error
//   localForage.getItem('key', function (err1, value) {
//     // if err is non-null, we got an error. otherwise, value is the value
//   });
// });


@NgModule({
  declarations: [
    AppComponent,
    OutpostAddComponent,
    OutpostListComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgReduxModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    MatButtonModule,
    MatCheckboxModule,
  ],
  exports: [AlertModule, BsDropdownModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<LogState>,
    private devTools: DevToolsExtension) {

    const logger = createLogger({
      collapsed: true,
    });

    const persistConfig = {
      key: 'root',
      storage: localForage,
      stateReconciler: hardSet,
    };
    const persistedReducer = persistReducer(persistConfig, mainReducer);

    const store: Store<LogState> = createStore(
      persistedReducer,
      composeWithDevTools(
        applyMiddleware(logger),
      )
    );

    ngRedux.provideStore(store);
    persistStore(store);
  }
}

