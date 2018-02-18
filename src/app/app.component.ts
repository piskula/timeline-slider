import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpErrorResponse} from '@angular/common/http';

import {ShareTimeService} from './time-service/share-time.service';
import {
  PossibleTimestampsService,
  TimestampsWithStep
} from './time-service/possible-timestamps.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public initialized: Boolean = false;
  public error: String = null;
  public rangeChosen: Observable<Number[]>;

  constructor(private _timeService: ShareTimeService,
              private _timestamps: PossibleTimestampsService) {
  }

  ngOnInit(): void {
    this.initializeTimeline();
    this.rangeChosen = this._timeService.getRangeChosen();
  }

  public initializeTimeline(): void {
    this.initialized = false;
    this.error = null;

    this._timestamps
      .getTimestamps()
      .takeWhile(() => !this.initialized)
      .finally(() => this.initialized = true)
      .catch((error: HttpErrorResponse) => {
        this.error = error.status + ': ' + error.statusText;
        throw error;
      })
      .subscribe((response: TimestampsWithStep) => {
        this.setNewData(response);
        // this.initializePeriodicalCheck();
      });
  }

  private initializePeriodicalCheck() {
    console.log('init');
    Observable
      .interval(5000)
      .flatMap((i) => {
        console.log('iter');
        return this._timestamps
          .getTimestamps();
      })
      .subscribe((response: TimestampsWithStep) => this.setNewData(response));
  }

  private setNewData(data: TimestampsWithStep): void {
    this._timeService.setMin(data.timestamps[0]);
    this._timeService.setMax(data.timestamps[1]);
    this._timeService.setRangeChosen([data.timestamps[0], data.timestamps[1]]);
  }

}
