import {Component, OnInit} from '@angular/core';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/finally'
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeWhile';

import {ShareTimeService} from '../time-service/share-time.service';
import {PossibleTimestampsService, TimestampsWithStep} from '../time-service/possible-timestamps.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TimelineConfiguration} from './model/configuration';
import * as moment from 'moment';

@Component({
  selector: 'app-timeline-frame',
  templateUrl: './timeline-frame.component.html',
  styleUrls: ['./timeline-frame.component.scss']
})
export class TimelineFrameComponent implements OnInit {

  public configuration: TimelineConfiguration;

  public initialized: Boolean = true;
  public error: String = 'Please, configure timeline:';
  public periodicTaskInProgress: Boolean = false;
  public refreshButtonActive: Boolean = false;

  public leftTitle = '';
  public centerTitle = '';
  public rightTitle = '';

  constructor(private _timeService: ShareTimeService,
              private _timestamps: PossibleTimestampsService) { }

  ngOnInit() {
    this._timeService.getMax().subscribe(maxValue => {
      // console.log('came: ' + maxValue);
      this.refreshHeader(this._timeService.getMin().getValue(), maxValue);
    });
  }

  public onSubmit(dataFromForm: TimelineConfiguration) {
    this.configuration = dataFromForm;
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
      .getTimestamps(this.configuration.url)
      .takeWhile(() => !this.initialized)
      .finally(() => this.initialized = true)
      .catch((error: HttpErrorResponse) => {
        this.error = error.status + ': ' + error.statusText;
        throw error;
      })
      .subscribe((response: TimestampsWithStep) => {
        this.setNewData(response);
        if (this.configuration.period !== 0) {
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
      .interval(this.configuration.period * 1000)
      .flatMap((i) => {
        return this._timestamps
          .getTimestamps(this.configuration.url);
      })
      .catch((error: HttpErrorResponse) => {
        this.periodicTaskInProgress = false;
        this.refreshButtonActive = true;
        throw error;
      })
      .subscribe((response: TimestampsWithStep) => {
        this._timeService.setMax(response.timestamps[1]);
      });
  }

  private refreshHeader(min: Number, max: Number): void {
    if (min && max) {
      const start = moment(new Date(min.valueOf() * 1000)).utc();
      const end = moment(new Date(max.valueOf() * 1000)).utc();

      if (start.isSame(end, 'day')) {
        this.leftTitle = start.format('HH:mm');
        this.centerTitle = start.format(start.localeData().longDateFormat('LL'));
        this.rightTitle = end.format('HH:mm');
      } else {
        this.leftTitle = start.format(start.localeData().longDateFormat('LL'));
        this.centerTitle = '';
        this.rightTitle = end.format(end.localeData().longDateFormat('LL'));
      }
    }
  }

}
