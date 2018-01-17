import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShareTimeService } from '../../time-service/share-time.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-timeline-slider-upper',
  templateUrl: './timeline-slider-upper.component.html',
  styleUrls: ['./timeline-slider-upper.component.css']
})
export class TimelineSliderUpperComponent implements OnInit, OnDestroy {

  step = 20;

  public min: Number;
  public max: Number;
  public rangeChosen: Number[];
  public isLockedRight: Boolean;
  public isLockedLeft: Boolean;

  private range$: Subscription;
  private max$: Subscription;
  private isLockedRight$: Subscription;
  private isLockedLeft$: Subscription;

  constructor(private _timeService: ShareTimeService) { }

  ngOnInit() {
    this.min = this._timeService.getLastMin();
    this.max = this._timeService.getLastMax();
    this.rangeChosen = this._timeService.getLastRangeChosen();
    this.isLockedRight = this._timeService.getLastIsLocked();
    this.isLockedLeft = this._timeService.getLastIsLockedLeft();

    this.range$ = this._timeService.getRangeChosen().subscribe(range => {
      this.rangeChosen = range;
    });
    this.max$ = this._timeService.getMax().subscribe(max => {
      this.max = max;
    });
    this.isLockedRight$ = this._timeService.isLocked().subscribe(isLocked => {
      this.isLockedRight = isLocked;
    });
    this.isLockedLeft$ = this._timeService.isLockedLeft().subscribe(isLockedLeft => {
      this.isLockedLeft = isLockedLeft;
    });
  }

  ngOnDestroy() {
    this.range$.unsubscribe();
    this.max$.unsubscribe();
    this.isLockedRight$.unsubscribe();
    this.isLockedLeft$.unsubscribe();
  }

  public onRangeChange(event: Number[]) {
    this._timeService.setRangeChosen(event);
  }

  public lockLeftChange(value: boolean) {
    this._timeService.setLockedLeft(value);
  }
}
