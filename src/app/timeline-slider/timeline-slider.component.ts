import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {TimeFormatter} from './time-formatter/time-formatter.component';
import {DefaultFormatter, NouisliderComponent} from 'ng2-nouislider';

@Component({
  selector: 'app-timeline-slider',
  templateUrl: './timeline-slider.component.html',
  styleUrls: ['./timeline-slider.component.css'],
  encapsulation: ViewEncapsulation.None   // because of component @import styling
})
export class TimelineSliderComponent implements OnInit {

  @Input() boxes: number;

  public upperRange: number[] = [27000, 43200];
  public someRange3: number[] = [2, 5];

  upperTimelineConfig: any = {
    behaviour: 'drag',
    connect: true,
    start: this.upperRange,
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
    step: 1,
    // pips: {
    //   mode: 'count',
    //   density: 1,
    //   values: 10,
    //   stepped: true
    // }
  };

  constructor() { }

  ngOnInit() {
  }

}
