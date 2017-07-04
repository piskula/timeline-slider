import {Component, Input, OnInit} from '@angular/core';
import {TimeFormatter} from '../timeline-slider/time-formatter/time-formatter.component';
import * as moment from 'moment';

@Component({
  selector: 'app-timeline-scale',
  templateUrl: './timeline-scale.component.html',
  styleUrls: ['./timeline-scale.component.css']
})
export class TimelineScaleComponent implements OnInit {

  _min: number;
  _max: number;
  format: TimeFormatter;
  pipes: Pipe[];

  @Input() step: number;

  @Input('max')
  set max(value: number) {
    this._max = value;
    if (this._min !== undefined) {
      this.refreshPipes();
    }
  }

  @Input('min')
  set min(value: number) {
    this._min = value;
    if (this._max !== undefined) {
      this.refreshPipes();
    }
  }

  constructor() {
    this.format = new TimeFormatter();
  }

  ngOnInit() {
  }

  refreshPipes() {
    const interval = this.getStep();
    const numberOfBoxes = ((this._max - this._min) / interval) + 1; // / this.step;
    const percentageLength = 100 / (numberOfBoxes - 1);

    this.pipes = [];
    for (let i = 0; i <= numberOfBoxes - 1; i++) {
      this.pipes.push(new Pipe(
        (i * percentageLength) + '%',
        this.getPipeFormatted(this._min + (i * interval), this.getFormat(interval))
      ));
    }
  }

  getPipeFormatted(timestamp: number, pattern: string): string {
    const date = new Date(timestamp * 1000);
    return moment(date).format(pattern);
  }

  getFormat(step: number): string {
    switch (step) {
      case 1:
      case 2:
      case 5:
        return 'ss';
      case 10:
      case 20:
      case 30:
      case 60:
      case 90:
        return 'mm:ss';
      case 120:
        return 'HH:mm';
      default:
        return '';
    }
  }

  getStep(): number {
    const amount = this._max - this._min + 1;
    if (amount <= 11) {          // < 10 seconds  - interval 1 second
      return 1; // max 11
    } else if (amount <= 21) {   // < 20 seconds  - interval 2 seconds
      return 2; // max 11
    } else if (amount <= 61) {   // < 1 minute    - interval 5 seconds
      return 5; // max 13
    } else if (amount <= 121) {  // < 2 minutes   - interval 10 seconds
      return 10; // max 13
    } else if (amount <= 301) {  // < 5 minutes   - interval 20 seconds
      return 20; // max 16
    } else if (amount <= 421) {  // < 7 minutes   - interval 30 seconds
      return 30; // max 15
    } else if (amount <= 721) {  // < 12 minutes  - interval 1 minute
      return 60; // max 13
    } else if (amount <= 901) {  // < 15 minutes  - interval 1m:30s
      return 90; // max 11
    } else if (amount <= 1201) { // < 30 minutes  - interval 2 minutes
      return 120; // max 11
    }
    return 240;
  }

}

class Pipe {
  value: string;
  title: string;

  constructor(value: string, title: string) {
    this.value = value;
    this.title = title;
  }
}
