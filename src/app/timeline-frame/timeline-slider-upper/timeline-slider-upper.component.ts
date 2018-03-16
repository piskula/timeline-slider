import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ShareTimeService } from '../../time-service/share-time.service';

@Component({
  selector: 'app-timeline-slider-upper',
  templateUrl: './timeline-slider-upper.component.html',
  styleUrls: ['./timeline-slider-upper.component.scss']
})
export class TimelineSliderUpperComponent implements OnInit {

  step = 20;
  public min$: Observable<Number>;
  public max$: Observable<Number>;
  public rangeChosen$: Observable<Number[]>;
  public isLockedRight$: Observable<Boolean>;
  public isLockedLeft$: Observable<Boolean>;

  constructor(private _timeService: ShareTimeService) { }

  ngOnInit() {
    this.min$ = this._timeService.getMin();
    this.max$ = this._timeService.getMax();
    this.rangeChosen$ = this._timeService.getRangeChosen();
    this.isLockedRight$ = this._timeService.isLockedRight();
    this.isLockedLeft$ = this._timeService.isLockedLeft();
  }

  public onRangeChange(event: Number[]) {
    this._timeService.setRangeChosen(event);
  }

  public lockLeftChange(value: boolean) {
    this._timeService.setLockedLeft(value);
  }

  public lockRightChange(value: boolean) {
    this._timeService.setLockedRight(value);
  }
}
