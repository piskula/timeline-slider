import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-timeline-scale',
  templateUrl: './timeline-scale.component.html',
  styleUrls: ['./timeline-scale.component.css']
})
export class TimelineScaleComponent implements OnInit {

  @Input() min: number;
  @Input() step: number;
  numberOfBoxes: number;

  pipes: Pipe[];

  constructor() { }

  ngOnInit() {
  }

  @Input('max')
  set max(max: number) {
    this.numberOfBoxes = (max - this.min) / this.step;
    // console.error('boxes:' + this.numberOfBoxes);
    this.pipes = [];
    for (let i = 0; i <= this.numberOfBoxes; i++) {
      this.pipes.push(new Pipe(
        (i * this.getPercentage()) + '%',
        (this.min + (i * this.step)).toString()
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
