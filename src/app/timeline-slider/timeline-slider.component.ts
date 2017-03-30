import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TimeFormatter} from './time-formatter/time-formatter.component';

@Component({
  selector: 'app-timeline-slider',
  templateUrl: './timeline-slider.component.html',
  styleUrls: ['./timeline-slider.component.css'],
  encapsulation: ViewEncapsulation.None   // because of component @import styling
})
export class TimelineSliderComponent implements OnInit {

  public someRange2: number[] = [27000, 43200];
  public someRange3: number[] = [27000, 43200];
  // public someRange3: number[] = [1, 3];

  someTimeConfig: any = {
    behaviour: 'drag',
    connect: true,
    start: this.someRange2,
    step: 60,
    pageSteps: 60,
    range: {
      min: 0,
      max: 86400
    },
    tooltips: [new TimeFormatter(), new TimeFormatter()],
    pips: {
      mode: 'count',
      density: 2,
      values: 25,
      stepped: true,
      format: new TimeFormatter()
    }
  };

  someRange2config: any = {
    behaviour: 'drag',
    connect: true,
    start: this.someRange3,
    keyboard: true,  // same as [keyboard]="true"
    step: 60,
    pageSteps: 60,  // number of page steps, defaults to 10
    range: {
      min: 0,
      max: 86400
    },
    pips: {
      mode: 'count',
      density: 2,
      values: 25,
      stepped: true,
      format: new TimeFormatter()
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
