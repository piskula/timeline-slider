import { Component, OnInit } from '@angular/core';
import { ShareTimeService } from '../../time-service/share-time.service';

@Component({
  selector: 'app-timeline-slider-upper',
  templateUrl: './timeline-slider-upper.component.html',
  styleUrls: ['./timeline-slider-upper.component.css']
})
export class TimelineSliderUpperComponent implements OnInit {

  step = 20;

  public min: Number;
  public max: Number;
  public rangeChosen: Number[];

  constructor(private _timeService: ShareTimeService) { }

  ngOnInit() {
    this.min = this._timeService.getLastMin();
    this.max = this._timeService.getLastMax();
    this.rangeChosen = this._timeService.getLastRangeChosen();

    this._timeService.getRangeChosen().subscribe(range => {
      this.rangeChosen = range;
    });
    this._timeService.getMax().subscribe(max => {
      this.max = max;
    });
  }

  public onRangeChange(event) {
    this._timeService.setRangeChosen(event);
  }

}
