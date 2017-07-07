import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {TimeFormatter} from '../../timeline-slider/time-formatter/time-formatter.component';
import {DefaultFormatter, NouisliderComponent} from 'ng2-nouislider';
import {log} from "util";

@Component({
  selector: 'app-timeline-slider',
  templateUrl: './timeline-slider.component.html',
  styleUrls: ['./timeline-slider.component.css'],
  encapsulation: ViewEncapsulation.None   // because of component @import styling
})
export class TimelineSliderComponent implements OnInit {

  _min: number;
  _max: number;
  @Input() step: number;

  @Input('outerRange')
  set outerRange(value: number[]) {
    this._min = value[0];
    this._max = value[1];
    if (this.range !== undefined) {
      let changed = false;
      if (value[1] < this.range[1]) {
        changed = true;
        this.range[1] = value[1];
      }
      if (value[0] > this.range[0]) {
        changed = true;
        this.range[0] = value[0];
      }
      if (changed) {
        console.log('Upper changed lower !!! ' + value);
        this.rangeUpdated.emit([value[0], value[1]]);
      }
    }
  }

  @Output() rangeUpdated = new EventEmitter();

  public range: number[];

  upperConfig: any = {
    behaviour: 'drag',
    connect: true,
    start: this.range,
    tooltips: [new TimeFormatter(), new TimeFormatter()],
    keyboard: false  // same as [keyboard]="true"
  };

  constructor() { }

  ngOnInit() {
    this.range = [this._min, this._max];
    this.handleOnChange();
  }

  handleOnChange() {
    console.log('handleOnCange emit ' + this.range);
    this.rangeUpdated.emit(this.range);
  }

}
