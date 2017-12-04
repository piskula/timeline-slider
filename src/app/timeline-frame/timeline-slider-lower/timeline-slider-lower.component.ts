import { Component, OnInit } from '@angular/core';
import { ShareTimeService } from '../../time-service/share-time.service';

@Component({
  selector: 'app-timeline-slider-lower',
  templateUrl: './timeline-slider-lower.component.html',
  styleUrls: ['./timeline-slider-lower.component.css']
})
export class TimelineSliderLowerComponent implements OnInit {

  public step = 20;
  public rangeChosen: Number[];

  constructor(private _timeService: ShareTimeService) { }

  ngOnInit() {
    this.rangeChosen = this._timeService.getLastRangeChosen();

    this._timeService.getRangeChosen().subscribe(range => {
      this.rangeChosen = range;
    });
  }

  public onRangeChange(event) {
    this._timeService.setRangeChosen(event);
  }

}
