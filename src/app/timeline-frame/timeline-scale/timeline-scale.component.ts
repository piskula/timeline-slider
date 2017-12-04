import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-timeline-scale',
  templateUrl: './timeline-scale.component.html',
  styleUrls: ['./timeline-scale.component.css']
})
export class TimelineScaleComponent implements OnInit {

  _min: number;
  _max: number;
  pipes: Pipe[];

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
  }

  ngOnInit() {
  }

  refreshPipes() {
    const pipeInfo = this.getStep();
    const bigInterval = pipeInfo.bigInterval;
    let middleInterval: number;
    let smallInterval: number;

    if (pipeInfo.smallIntervalAmount) {
      smallInterval = (bigInterval / (pipeInfo.middleIntervalAmount + 1)) / (pipeInfo.smallIntervalAmount + 1);
      middleInterval = bigInterval / (pipeInfo.middleIntervalAmount + 1);
    } else {
      smallInterval = bigInterval / (pipeInfo.middleIntervalAmount + 1);
    }

    this.pipes = [];

    const majorMin = this._min % bigInterval === 0 ?
      this._min :
      this._min + (bigInterval - (this._min % bigInterval));

    let i = majorMin;
    while (i <= this._max) {
      let pipe: string;
      let priority: number;
      if (i % bigInterval === 0) {
        pipe = this.getPipeFormatted(i, pipeInfo.pattern);
        priority = 1;
      } else if (middleInterval && i % middleInterval === 0) {
        pipe = pipeInfo.subPattern ? this.getPipeFormatted(i, pipeInfo.subPattern) : '';
        priority = 2;
      } else {
        pipe = '';
        priority = 3;
      }

      this.pipes.push(new Pipe(
        ((i - this._min) / (this._max - this._min)) * 100 + '%',
        pipe,
        priority
      ));
      i += smallInterval;
    }

    i = majorMin - smallInterval;
    while (i >= this._min) {

      let pipe: string;
      let priority: number;
      if (i % bigInterval === 0) {
        pipe = this.getPipeFormatted(i, pipeInfo.pattern);
        priority = 1;
      } else if (middleInterval && i % middleInterval === 0) {
        pipe = this.getPipeFormatted(i, pipeInfo.subPattern);
        priority = 2;
      } else {
        pipe = '';
        priority = 3;
      }

      this.pipes.push(new Pipe(
        ((i - this._min) / (this._max - this._min)) * 100 + '%',
        pipe,
        priority
      ));
      i -= smallInterval;
    }
  }

  getPipeFormatted(timestamp: number, pattern: string): string {
    const date = new Date(timestamp * 1000);
    return moment(date).utc().format(pattern);
  }

  getStep(): PipeInfo {
    const amount = this._max - this._min + 1;
    if (amount <= 11) {          // < 10 seconds  - interval 1 second
      return new PipeInfo(1, 0, null, 'ss\'\'', null);
    } else if (amount <= 21) {   // < 20 seconds  - interval 5 seconds
      return new PipeInfo(5, 4, null, 'ss\'\'', null);
    } else if (amount <= 81) {   // < 1m 25s    - interval 10 seconds
      return new PipeInfo(10, 1, 4, 'mm\' ss\'\'', 'ss\'\'');
    } else if (amount <= 121) {  // < 2 minutes   - interval 10 seconds
      return new PipeInfo(10, 1, 4, 'mm\' ss\'\'', null);
    } else if (amount <= 241) {  // < 4 minutes   - interval 1 minute
      return new PipeInfo(60, 3, 2, 'mm\' ss\'\'', 'ss\'\'');
    } else if (amount <= 421) {  // < 7 minutes   - interval 1 minute
      return new PipeInfo(60, 1, 9, 'mm\' ss\'\'', 'ss\'\'');
    } else if (amount <= 601) {  // < 10 minutes   - interval 2 minutes
      return new PipeInfo(120, 1, 9, 'mm\'', 'mm\'');
    } else if (amount <= 901) {  // < 15 minutes  - interval 5 minutes
      return new PipeInfo(300, 4, 9, 'mm\' ss\'\'', 'mm\'');
    } else if (amount <= 1201) {  // < 20 minutes  - interval 5 minutes
      return new PipeInfo(300, 4, 5, 'mm\'', 'mm\'');
    } else if (amount <= 2701) { // < 45 minutes  - interval 5 minutes
      return new PipeInfo(300, 4, null, 'HH:mm', null);
    } else if (amount <= 5101) { // < 85 minutes  - interval 10 minutes
      return new PipeInfo(600, 1, 4, 'HH:mm', 'mm\'');
    } else if (amount <= 9001) { // < 2h 30m      - interval 30 minutes
      return new PipeInfo(1800, 2, 9, 'HH:mm', 'mm\'');
    } else if (amount <= 14401) { // < 4h         - interval 1 hour
      return new PipeInfo(3600, 3, 2, 'HH:mm', 'mm\'');
    } else if (amount <= 25201) { // < 7h         - interval 1 hour
      return new PipeInfo(3600, 1, 1, 'HH:mm', 'HH:mm');
    } else if (amount <= 50401) { // < 14h        - interval 1 hour
      return new PipeInfo(3600, 1, 1, 'HH:mm', null);
    } else if (amount <= 82801) { // < 22h        - interval 6 hour
      return new PipeInfo(21600, 5, 1, 'HH:mm', 'HH');
    } else if (amount <= 111601) { // < 31h       - interval 1 day
      return new PipeInfo(86400, 11, 1, 'DD.MM.', 'HH:mm');
    } else if (amount <= 208801) { // < 58h       - interval 1 day
      return new PipeInfo(86400, 5, 3, 'DD.MM.', 'HH:mm');
    } else if (amount <= 302401) { // < 3,5 day   - interval 1 day
      return new PipeInfo(86400, 3, 5, 'DD.MM.', 'HH:mm');
    } else if (amount <= 648000) { // < 7,5 day  - interval 1 day
      return new PipeInfo(86400, 1, 5, 'DD.MM.', 'HH:mm');
    } // else if (amount <= 1000001) { // < 4h        - interval 1 day
      return new PipeInfo(86400, 1, 5, 'DD.MM.', null);
    // }
  }
}

class PipeInfo {
  bigInterval: number;
  smallIntervalAmount: number;
  middleIntervalAmount: number;
  pattern: string;
  subPattern: string;

  constructor(bigInterval: number, middleIntervalAmount: number, smallIntervalAmount: number, pattern: string, subPattern: string) {
    this.bigInterval = bigInterval;
    this.middleIntervalAmount = middleIntervalAmount;
    this.smallIntervalAmount = smallIntervalAmount;
    this.pattern = pattern;
    this.subPattern = subPattern;
  }
}

class Pipe {
  value: string;
  title: string;
  priority: number;

  constructor(value: string, title: string, priority: number) {
    this.value = value;
    this.title = title;
    this.priority = priority;
  }
}
