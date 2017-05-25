import {Component, Input, OnInit} from '@angular/core';
import {TimeFormatter} from "../timeline-slider/time-formatter/time-formatter.component";

@Component({
  selector: 'app-timeline-scale',
  templateUrl: './timeline-scale.component.html',
  styleUrls: ['./timeline-scale.component.css']
})
export class TimelineScaleComponent implements OnInit {

  // TODO zmenit input na pole, to by mohlo ist
  @Input() step: number;
  @Input() min: number;

  numberOfBoxes: number;
  format: TimeFormatter;
  pipes: Pipe[];

  constructor() {
    this.format = new TimeFormatter();
  }

  ngOnInit() {
  }

  @Input('max')
  set max(max: number) {
    this.numberOfBoxes = (max - this.min) / this.step;
    this.pipes = [];
    for (let i = 0; i <= this.numberOfBoxes; i++) {
      this.pipes.push(new Pipe(
        (i * this.getPercentage()) + '%',
        this.format.to(this.min + (i * this.step))
      ));
    }
    console.log('refreeeesh');
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
