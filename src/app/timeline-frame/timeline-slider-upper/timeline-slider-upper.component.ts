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

  private range$: Subscription;
  private max$: Subscription;

  constructor(private _timeService: ShareTimeService) { }

  ngOnInit() {
    this.min = this._timeService.getLastMin();
    this.max = this._timeService.getLastMax();
    this.rangeChosen = this._timeService.getLastRangeChosen();

    this.range$ = this._timeService.getRangeChosen().subscribe(range => {
      this.rangeChosen = range;
    });
    this.max$ = this._timeService.getMax().subscribe(max => {
      this.max = max;
    });
  }

  ngOnDestroy() {
    this.range$.unsubscribe();
    this.max$.unsubscribe();
  }

  public onRangeChange(event) {
    this._timeService.setRangeChosen(event);
  }

}
