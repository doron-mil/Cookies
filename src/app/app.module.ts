import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {AlertModule, BsDropdownModule} from 'ngx-bootstrap';
import {OutpostAddComponent} from './outpost-add/outpost-add.component';
import {OutpostListComponent} from './outpost-list/outpost-list.component';
import {AppRoutingModule} from './/app-routing.module';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {mainReducer} from './Store/main.reducer';
import {MainEffects} from './Store/main.effects';
import {LogState} from './Store/main.state';
import {AppActions} from './Store/app.actions';

export interface AppState  {
  mainReducer: LogState;
}

export const reducers: ActionReducerMap<AppState , AppActions> = {
  mainReducer: mainReducer,
};

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
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([MainEffects]),

  ],
  exports: [AlertModule, BsDropdownModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
