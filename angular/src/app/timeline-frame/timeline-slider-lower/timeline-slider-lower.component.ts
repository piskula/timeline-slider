import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/index';

import { ShareTimeService } from '../../time-service/share-time.service';

@Component({
  selector: 'app-timeline-slider-lower',
  templateUrl: './timeline-slider-lower.component.html',
  styleUrls: ['./timeline-slider-lower.component.scss']
})
export class TimelineSliderLowerComponent implements OnInit {

  public step$: Observable<Number>;
  public rangeChosen$: Observable<Number[]>;

  constructor(private _timeService: ShareTimeService) {
  }

  ngOnInit() {
    this.step$ = this._timeService.getStep();
    this.rangeChosen$ = this._timeService.getRangeChosen();
  }

  public onRangeChange(event) {
    this._timeService.setRangeChosen(event);
  }

}
