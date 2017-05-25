import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-timeline-frame',
  templateUrl: './timeline-frame.component.html',
  styleUrls: ['./timeline-frame.component.css']
})
export class TimelineFrameComponent implements OnInit {

  @Input() min: number;
  @Input() max: number;
  @Input() step: number;

  public range: number[];

  constructor() { }

  ngOnInit() {
  }

  handleRangeUpdated(range) {
    this.range = range;
  }

}
