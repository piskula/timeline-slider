import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ShareTimeService} from './time-service/share-time.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public rangeChosen: Observable<Number[]>;

  constructor(private _timeService: ShareTimeService) { }

  ngOnInit(): void {
    this.rangeChosen = this._timeService.getRangeChosen();
  }

}
