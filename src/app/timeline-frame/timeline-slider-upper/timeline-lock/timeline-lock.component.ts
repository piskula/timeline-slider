import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ShareTimeService } from '../../../time-service/share-time.service';

@Component({
  selector: 'app-timeline-lock',
  templateUrl: './timeline-lock.component.html',
  styleUrls: ['./timeline-lock.component.css']
})
export class TimelineLockComponent implements OnInit, OnDestroy {

  public isLocked: Boolean;
  private lock$: Subscription;

  constructor(private _timeService: ShareTimeService) { }

  ngOnInit() {
    this.lock$ = this._timeService.isLocked().subscribe(x => {
      this.isLocked = x;
    });
  }

  ngOnDestroy() {
    this.lock$.unsubscribe();
  }

  toggleLock() {
    this._timeService.setLocked(!this.isLocked);
  }

}
