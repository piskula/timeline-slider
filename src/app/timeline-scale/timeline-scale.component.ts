import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-timeline-scale',
  templateUrl: './timeline-scale.component.html',
  styleUrls: ['./timeline-scale.component.css']
})
export class TimelineScaleComponent implements OnInit {

  numberOfBoxes: number;
  pipes: number[];

  constructor() { }

  ngOnInit() {
  }

  @Input('boxes')
  set boxes(boxes: number) {
    this.numberOfBoxes = boxes;
    this.pipes = [];
    for (let i = 0; i <= boxes; i++) {
      this.pipes.push(i * this.getPercentage());
    }
  }

  get boxes(): number {
    return this.numberOfBoxes;
  }

  getPercentage(): number {
    return 100 / this.numberOfBoxes;
  }

  getLeft(item: number): string {
    return item + '%';
  }

}
