import {Component, Input, OnInit} from '@angular/core';

import {ShareTimeService} from '../time-service/share-time.service';
import {PossibleTimestampsService, TimestampsWithStep} from '../time-service/possible-timestamps.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-timeline-frame',
  templateUrl: './timeline-frame.component.html',
  styleUrls: ['./timeline-frame.component.scss']
})
export class TimelineFrameComponent implements OnInit {

  @Input() isPeriodical = false;

  public initialized: Boolean = false;
  public error: String = null;
  public periodicTaskInProgress: Boolean = false;
  public refreshButtonActive: Boolean = false;

  constructor(private _timeService: ShareTimeService,
              private _timestamps: PossibleTimestampsService) { }

  ngOnInit() {
    this.initializeTimeline();
  }

  public refreshTimeline() {
    if (this.refreshButtonActive) {
      this.initializePeriodicalCheck();
    }
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
        if (this.isPeriodical) {
          this.initializePeriodicalCheck();
        }
      });
  }

  private setNewData(data: TimestampsWithStep): void {
    this._timeService.setMin(data.timestamps[0]);
    this._timeService.setMax(data.timestamps[1]);
    this._timeService.setRangeChosen([data.timestamps[0], data.timestamps[1]]);
  }

  private initializePeriodicalCheck() {
    this.periodicTaskInProgress = true;
    this.refreshButtonActive = false;
    Observable
      .interval(5000)
      .flatMap((i) => {
        return this._timestamps
          .getTimestamps();
      })
      .catch((error: HttpErrorResponse) => {
        this.periodicTaskInProgress = false;
        this.refreshButtonActive = true;
        throw error;
      })
      .subscribe((response: TimestampsWithStep) => this.setNewData(response));
  }

}
