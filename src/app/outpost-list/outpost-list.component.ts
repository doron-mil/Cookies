import {Component, OnInit} from '@angular/core';
import {Outpost} from '../model/outpost';
import {LogState} from '../Store/main.state';
import {NgRedux} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-outpost-list',
  templateUrl: './outpost-list.component.html',
  styleUrls: ['./outpost-list.component.css']
})
export class OutpostListComponent implements OnInit {

  outpostList: Observable<Outpost[]>;

  constructor(private ngRedux: NgRedux<LogState>) {
    this.outpostList = ngRedux.select<Outpost[]>('outpostList');
    // .subscribe( (aaaa) => console.log('2222222222222222', aaaa) );

    // ngRedux.select<Outpost[]>('outpostList')
    //   .subscribe((aaaa) => console.log('2222222222222222', type(aaaa), aaaa));
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
