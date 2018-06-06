import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OutpostListComponent} from './outpost-list/outpost-list.component';
import {OutpostAddComponent} from './outpost-add/outpost-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/outpost-list', pathMatch: 'full' },
  { path: 'outpost-list', component: OutpostListComponent },
  { path: 'outpost-add', component: OutpostAddComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
