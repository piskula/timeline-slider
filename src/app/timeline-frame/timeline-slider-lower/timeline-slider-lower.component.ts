import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {TimeFormatter} from '../../timeline-slider/time-formatter/time-formatter.component';
import {NouisliderComponent} from 'ng2-nouislider/src/nouislider';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-timeline-slider-lower',
  templateUrl: './timeline-slider-lower.component.html',
  styleUrls: ['./timeline-slider-lower.component.css'],
  encapsulation: ViewEncapsulation.None   // because of component @import styling
})
export class TimelineSliderLowerComponent implements OnInit {

  mRangeChosen: number[];

  upperConfig: any;
  timeFormatter: TimeFormatter;
  @Input() step: number;

  @Input('rangeChosen')
  set rangeChosen(value: number[]) {
    this.mRangeChosen = value;
  }
  @Output() rangeChosenChange = new EventEmitter();
  @ViewChild(NouisliderComponent) slider: NouisliderComponent;

  constructor() {
  }

  ngOnInit() {
    this.timeFormatter = new TimeFormatter;
    this.upperConfig = {
      behaviour: 'drag',
      connect: true,
      start: this.mRangeChosen,
      margin: this.step,
      tooltips: [this.timeFormatter, this.timeFormatter]
    };
  }

  onChange(value) {
    this.rangeChosenChange.emit(value);
  }

}
