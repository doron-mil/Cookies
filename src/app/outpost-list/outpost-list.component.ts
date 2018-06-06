import {Component, OnInit} from '@angular/core';
import {Outpost} from '../model/outpost';
import {OutpostsService} from '../outposts.service';

@Component({
  selector: 'app-outpost-list',
  templateUrl: './outpost-list.component.html',
  styleUrls: ['./outpost-list.component.css']
})
export class OutpostListComponent implements OnInit {

  outpostList: Outpost[] ;

  constructor(private outpostsService: OutpostsService) {
  }

  ngOnInit() {
    this.outpostList = this.outpostsService.getOutpostsList();
  }

}
