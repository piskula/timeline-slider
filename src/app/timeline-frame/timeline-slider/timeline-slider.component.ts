import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {TimeFormatter} from '../../timeline-slider/time-formatter/time-formatter.component';

@Component({
  selector: 'app-timeline-slider',
  templateUrl: './timeline-slider.component.html',
  styleUrls: ['./timeline-slider.component.css'],
  encapsulation: ViewEncapsulation.None   // because of component @import styling
})
export class TimelineSliderComponent implements OnInit {

  _min: number;
  _max: number;
  timeFormatter: TimeFormatter;
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
        this.rangeUpdated.emit([this.range[0], this.range[1]]);
      }
      this.timeFormatter.setFormat(this.getFormat(value[1] - value[0]));
    }
  }

  @Output() rangeUpdated = new EventEmitter();

  public range: number[];

  upperConfig: any;

  constructor() {
  }

  ngOnInit() {
    this.range = [this._min, this._max];
    this.timeFormatter = new TimeFormatter;
    this.upperConfig = {
      behaviour: 'drag',
      connect: true,
      start: this.range,
      tooltips: [this.timeFormatter, this.timeFormatter],
      keyboard: false  // same as [keyboard]="true"
    };
    this.handleOnChange();
  }

  handleOnChange() {
    this.rangeUpdated.emit(this.range);
  }

  private getFormat(amount: Number): string {
    console.log('amount: ' + amount);
    if (amount < 2300) {
      return 'HH:mm:ss';
    } else if (amount < 130000) {
      return 'HH:mm';
    }
    return 'DD.MM. HH:mm';
  }

}
