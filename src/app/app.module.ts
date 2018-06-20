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
import {NgRedux, NgReduxModule} from '@angular-redux/store';
import {mainReducer} from './Store/main.reducer';
import {createLogger} from 'redux-logger' ;

const logger = createLogger({
  collapsed: true,
});

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
  constructor(ngRedux: NgRedux<LogState>) {
    ngRedux.configureStore(mainReducer, INITIAL_STATE, [logger]);
  }
}

