import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ShareTimeService } from '../time-service/share-time.service';

@Component({
  selector: 'app-timeline-frame',
  templateUrl: './timeline-frame.component.html',
  styleUrls: ['./timeline-frame.component.css']
})
export class TimelineFrameComponent implements OnInit, OnDestroy {

  public rangeChosen: Number[];

  private range$: Subscription;

  constructor(private _timeService: ShareTimeService) { }

  ngOnInit() {
    this.rangeChosen = this._timeService.getLastRangeChosen();
    this._timeService.getRangeChosen().subscribe(range => {
      this.rangeChosen = range;
    });
  }

  ngOnDestroy() {
    this.range$.unsubscribe();
  }
}
