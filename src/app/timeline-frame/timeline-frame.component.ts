import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-timeline-frame',
  templateUrl: './timeline-frame.component.html',
  styleUrls: ['./timeline-frame.component.css']
})
export class TimelineFrameComponent implements OnInit {

  public upperRange: number[];

  @Input() min: number;
  @Input() max: number;
  @Input() step: number;

  @Output() range = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  handleUpperRangeUpdated(upperRange) {
    this.upperRange = upperRange;
    console.log('handleUpperRangeUpdated ' + this.upperRange);
  }

  handleLowerRangeUpdated(lowerRange) {
    console.log('handleLowerRangeUpdated emit ' + lowerRange);
    this.range.emit(lowerRange);
  }

}
