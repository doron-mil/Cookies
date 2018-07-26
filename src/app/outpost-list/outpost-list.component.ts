import {Component, OnInit} from '@angular/core';
import {Outpost} from '../model/outpost';
import {AppState, LogState} from '../Store/main.state';
import {NgRedux} from '@angular-redux/store';
import {Observable, pipe} from 'rxjs';
import {map} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-outpost-list',
  templateUrl: './outpost-list.component.html',
  styleUrls: ['./outpost-list.component.css']
})
export class OutpostListComponent implements OnInit {
  Supply: string;
  outpostList: Observable<Outpost[]>;

  constructor(private ngRedux: NgRedux<LogState>,
              translate: TranslateService) {

    this.outpostList = ngRedux.select('outposts').pipe(
      map((logState: AppState) => {
        // console.log('bbbbbbbbbbbb222', logState);
        return logState.outpostList;
      }));

    translate.get('main.outposts.table.headers.supply').subscribe(value => this.Supply = value);
  }

  ngOnInit() {
    this.refreshData();

  }

  private refreshData() {
  }
}

const type = (obj) => {
  return Object.prototype.toString.call(obj).slice(8, -1);
};
