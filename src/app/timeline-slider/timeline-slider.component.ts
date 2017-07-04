import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {TimeFormatter} from './time-formatter/time-formatter.component';
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

  @Input('max')
  set max(value: number) {
    this._max = value;
    if (this.range !== undefined && value < this.range[1]) {
      // console.log('fireMax');
      this.range[1] = value;
      this.handleOnChange();
    }
  }

  @Input('min')
  set min(value: number) {
    this._min = value;
    if (this.range !== undefined && value > this.range[0]) {
      // console.log('fireMin');
      this.range[0] = value;
      this.handleOnChange();
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
    this.rangeUpdated.emit(this.range);
  }

}
