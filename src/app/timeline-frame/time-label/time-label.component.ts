import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-time-label',
  templateUrl: './time-label.component.html',
  styleUrls: ['./time-label.component.css']
})
export class TimeLabelComponent implements OnInit {

  year: string;
  month: string;
  dayOfMonth: string;
  hour: string;
  minute: string;
  second: string;

  showDate: boolean;

  @Input('range')
  set range(value: number) {
    this.showDate = value >= 14400;
  }

  @Input('timestamp')
  set timestamp(value: number) {
    const date = new Date(value * 1000);

    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds();

    this.year = '' + date.getUTCFullYear();
    this.month = '' + date.getUTCMonth();
    this.dayOfMonth = '' + date.getUTCDate();
    this.hour =   hh < 10 ? '0' + hh : '' + hh;
    this.minute = mm < 10 ? '0' + mm : '' + mm;
    this.second = ss < 10 ? '0' + ss : '' + ss;
  }

  constructor() { }

  ngOnInit() {
  }

}
