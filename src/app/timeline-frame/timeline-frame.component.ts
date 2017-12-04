import {Component, OnInit } from '@angular/core';

import { ShareTimeService } from '../time-service/share-time.service';

@Component({
  selector: 'app-timeline-frame',
  templateUrl: './timeline-frame.component.html',
  styleUrls: ['./timeline-frame.component.css']
})
export class TimelineFrameComponent implements OnInit {

  public rangeChosen: Number[];

  constructor(private _timeService: ShareTimeService) { }

  ngOnInit() {
    this.rangeChosen = this._timeService.getLastRangeChosen();
    this._timeService.getRangeChosen().subscribe(range => {
      this.rangeChosen = range;
    });
  }
}
