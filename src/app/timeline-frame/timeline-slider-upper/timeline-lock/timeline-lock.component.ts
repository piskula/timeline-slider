import { Component, OnInit } from '@angular/core';
import { ShareTimeService } from '../../../time-service/share-time.service';

@Component({
  selector: 'app-timeline-lock',
  templateUrl: './timeline-lock.component.html',
  styleUrls: ['./timeline-lock.component.css']
})
export class TimelineLockComponent implements OnInit {

  public isLocked: Boolean;

  constructor(private _timeService: ShareTimeService) { }

  ngOnInit() {
    this._timeService.isLocked().subscribe(x => {
      this.isLocked = x;
    });
  }

  toggleLock() {
    this._timeService.setLocked(!this.isLocked);
  }

}
