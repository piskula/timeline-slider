import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TimeFormatter} from '../../timeline-slider/time-formatter/time-formatter.component';
import {NouisliderComponent} from 'ng2-nouislider/src/nouislider';

@Component({
  selector: 'app-timeline-slider-upper',
  templateUrl: './timeline-slider-upper.component.html',
  styleUrls: ['./timeline-slider-upper.component.css']
})
export class TimelineSliderUpperComponent implements OnInit {

  timeFormatter = new TimeFormatter;
  isLocked = false;

  @Input() min: number;

  _max: number;
  @Input('max')
  set max(value: number) {
    this._max = value;
    this.timeFormatter.setRange([this.min, value]);
    if (this.isLocked) {
      this.slider.ngOnChanges({'upperLocked': 1, 'ngModel': 1});
      this.rangeChosenChange.emit([this.rangeChosen[0], value]);
    }
  }

  @Input() step: number;

  @Input() rangeChosen: number[];
  @Output() rangeChosenChange = new EventEmitter();
  @ViewChild(NouisliderComponent) slider: NouisliderComponent;

  upperConfig: any;

  constructor() {
  }

  ngOnInit() {
    this.upperConfig = {
      behaviour: 'drag',
      connect: true,
      start: this.rangeChosen,
      tooltips: [this.timeFormatter, this.timeFormatter]
    };
  }

  onChange(value) {
    console.log('Change: ' + value);
    if (this.rangeChosen[1] !== value[1]) {
      this.isLocked = false;
    }
    this.rangeChosenChange.emit(value);
  }

  onSet(value) {
    console.log('Set ' + value[1] + ',' + this._max + ',' + this.rangeChosen[1]);
    if (this._max !== value[1] && this._max !== this.rangeChosen[1]) {
      this.isLocked = false;
    }
  }

  toggleLocked() {
    this.isLocked = !this.isLocked;
    if (this.isLocked) {
      this.rangeChosenChange.emit([this.rangeChosen[0], this._max]);
    }
  }

}
