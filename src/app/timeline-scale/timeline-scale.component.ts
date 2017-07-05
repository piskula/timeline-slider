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
    const pipeInfo = this.getStep();
    const bigInterval = pipeInfo.bigInterval;
    const bigIntervalAmount = ((this._max - this._min) / bigInterval) + 1;
    const allIntervalAmount = ((bigIntervalAmount - 1) * (pipeInfo.smallInterval + 1)) + 1;
    const smallInterval = bigInterval / (pipeInfo.smallInterval + 1);

    // const numberOfBoxes = ((this._max - this._min) / bigInterval) + 1; // / this.step;
    const percentageLength = 100 / (allIntervalAmount - 1);

    this.pipes = [];
    for (let i = 0; i <= allIntervalAmount - 1; i++) {
      this.pipes.push(new Pipe(
        (i * percentageLength) + '%',
        (i * smallInterval) % bigInterval !== 0 ? '' : this.getPipeFormatted(this._min + (i * smallInterval), pipeInfo.pattern)
      ));
    }
  }

  getPipeFormatted(timestamp: number, pattern: string): string {
    const date = new Date(timestamp * 1000);
    return moment(date).format(pattern);
  }

  getStep(): PipeInfo {
    const amount = this._max - this._min + 1;
    if (amount <= 11) {          // < 10 seconds  - interval 1 second
      return new PipeInfo(1, 0, 'ss');                              // max 11
    } else if (amount <= 21) {   // < 20 seconds  - interval 2 seconds
      return new PipeInfo(2, 1, 'ss');                              // max 11
    } else if (amount <= 61) {   // < 1 minute    - interval 5 seconds
      return new PipeInfo(6, 5, 'ss');                              // max 13
    } else if (amount <= 121) {  // < 2 minutes   - interval 10 seconds
      return new PipeInfo(10, 1, 'mm:ss');                          // max 13
    } else if (amount <= 241) {  // < 4 minutes   - interval 15 seconds
      return new PipeInfo(15, 2, 'mm:ss');                          // max 17
    } else if (amount <= 301) {  // < 6 minutes   - interval 20 seconds
      return new PipeInfo(20, 3, 'mm:ss');                          // max 16
    } else if (amount <= 421) {  // < 7 minutes   - interval 30 seconds
      return new PipeInfo(30, 2, 'mm:ss');                          // max 15
    } else if (amount <= 721) {  // < 12 minutes  - interval 1 minute
      return new PipeInfo(60, 5, 'mm:ss');                          // max 13
    } else if (amount <= 901) {  // < 15 minutes  - interval 1m:30s
      return new PipeInfo(90, 2, 'mm:ss');                          // max 11
    } else if (amount <= 1201) { // < 30 minutes  - interval 2 minutes
      return new PipeInfo(120, 3, 'HH:mm'); // max 11
    }
    return new PipeInfo(300, 2, 'HH:mm');
  }

}

class PipeInfo {
  bigInterval: number;
  smallInterval: number;
  pattern: string;

  constructor(bigInterval: number, smallInterval: number, pattern: string) {
    this.bigInterval = bigInterval;
    this.smallInterval = smallInterval;
    this.pattern = pattern;
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
