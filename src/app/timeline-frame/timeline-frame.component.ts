import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-timeline-frame',
  templateUrl: './timeline-frame.component.html',
  styleUrls: ['./timeline-frame.component.css']
})
export class TimelineFrameComponent implements OnInit {

  public rangeChosen: number[];
  range: number[];

  @Input('range')
  set setRange(value) {
    this.range = [Number(value[0]), Number(value[1])];
  };
  @Input() step: number;

  constructor() { }

  ngOnInit() {
    this.rangeChosen = this.range;
  }
}
