import {Component, OnInit} from '@angular/core';
import {Outpost} from '../model/outpost';
import {OutpostsService} from '../services/outposts.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-outpost-add',
  templateUrl: './outpost-add.component.html',
  styleUrls: ['./outpost-add.component.css']
})
export class OutpostAddComponent implements OnInit {
  outpost: Outpost;

  constructor(private outpostsService: OutpostsService,
              private router: Router) {
  }

  ngOnInit() {
    this.outpost = new Outpost();
  }

  commitAndAddAnother() {
    this.outpostsService.addOutpost(this.outpost);
    this.outpost = new Outpost();
  }

  commitAndExit() {
    this.outpostsService.addOutpost(this.outpost);
    this.router.navigate(['outpost-list']);
  }

}
