import {Component, Input, OnInit} from '@angular/core';
import {TimeFormatter} from '../timeline-slider/time-formatter/time-formatter.component';

@Component({
  selector: 'app-timeline-scale',
  templateUrl: './timeline-scale.component.html',
  styleUrls: ['./timeline-scale.component.css']
})
export class TimelineScaleComponent implements OnInit {

  _min: number;
  _max: number;
  numberOfBoxes: number;
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
    this.numberOfBoxes = (this._max - this._min) / this.step;
    this.pipes = [];
    for (let i = 0; i <= this.numberOfBoxes; i++) {
      this.pipes.push(new Pipe(
        (i * this.getPercentage()) + '%',
        this.format.to(this._min + (i * this.step))
      ));
    }

  }

  getPercentage(): number {
    return 100 / this.numberOfBoxes;
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
