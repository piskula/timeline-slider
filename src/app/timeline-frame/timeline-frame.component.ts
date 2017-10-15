import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-timeline-frame',
  templateUrl: './timeline-frame.component.html',
  styleUrls: ['./timeline-frame.component.css']
})
export class TimelineFrameComponent implements OnInit {

  rangeChosen: number[];

  @Input() range: number[];
  @Input() step: number;

  constructor() { }

  ngOnInit() {
    this.rangeChosen = this.range;
  }
}
