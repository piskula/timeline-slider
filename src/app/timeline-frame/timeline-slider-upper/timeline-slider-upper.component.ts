import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TimeFormatter} from '../../timeline-slider/time-formatter/time-formatter.component';

@Component({
  selector: 'app-timeline-slider-upper',
  templateUrl: './timeline-slider-upper.component.html',
  styleUrls: ['./timeline-slider-upper.component.css']
})
export class TimelineSliderUpperComponent implements OnInit {

  timeFormatter: TimeFormatter;

  @Input() min: number;
  @Input() max: number;
  @Input() step: number;

  @Input() rangeChosen: number[];
  @Output() rangeChosenChange = new EventEmitter();

  upperConfig: any;

  constructor() {
  }

  ngOnInit() {
    this.timeFormatter = new TimeFormatter;
    this.upperConfig = {
      behaviour: 'drag',
      connect: true,
      start: this.rangeChosen,
      tooltips: [this.timeFormatter, this.timeFormatter]
    };
  }

  onChange(value) {
    this.rangeChosenChange.emit(value);
  }

}
