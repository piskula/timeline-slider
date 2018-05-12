import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/index';

import { ShareTimeService } from '../../time-service/share-time.service';

@Component({
  selector: 'app-timeline-slider-lower',
  templateUrl: './timeline-slider-lower.component.html',
  styleUrls: ['./timeline-slider-lower.component.scss']
})
export class TimelineSliderLowerComponent implements OnInit {

  public step = 20;
  public rangeChosen$: Observable<Number[]>;

  constructor(private _timeService: ShareTimeService) {
  }

  ngOnInit() {
    this.rangeChosen$ = this._timeService.getRangeChosen();
  }

  public onRangeChange(event) {
    this._timeService.setRangeChosen(event);
  }

}
