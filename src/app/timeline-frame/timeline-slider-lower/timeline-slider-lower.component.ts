import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShareTimeService } from '../../time-service/share-time.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-timeline-slider-lower',
  templateUrl: './timeline-slider-lower.component.html',
  styleUrls: ['./timeline-slider-lower.component.css']
})
export class TimelineSliderLowerComponent implements OnInit, OnDestroy {

  public step = 20;
  public rangeChosen: Number[];

  private range$: Subscription;

  constructor(private _timeService: ShareTimeService) { }

  ngOnInit() {
    this.rangeChosen = this._timeService.getLastRangeChosen();

    this.range$ = this._timeService.getRangeChosen().subscribe(range => {
      this.rangeChosen = range;
    });
  }

  ngOnDestroy() {
    this.range$.unsubscribe();
  }

  public onRangeChange(event) {
    this._timeService.setRangeChosen(event);
  }

}
