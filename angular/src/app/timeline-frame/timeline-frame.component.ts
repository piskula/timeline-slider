import { Component, OnInit } from '@angular/core';
import { catchError, finalize, mergeMap, takeWhile } from 'rxjs/internal/operators';
import { interval } from 'rxjs/index';
import * as moment from 'moment';

import { ShareTimeService } from '../time-service/share-time.service';
import { PossibleTimestampsService, TimestampsWithStep } from '../time-service/possible-timestamps.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TimelineConfiguration } from './model/configuration';

@Component({
  selector: 'app-timeline-frame',
  templateUrl: './timeline-frame.component.html',
  styleUrls: ['./timeline-frame.component.scss']
})
export class TimelineFrameComponent implements OnInit {

  public configuration: TimelineConfiguration;

  public initialized: Boolean = true;
  public showErrorInitialScreen: Boolean = true;
  public errorTooltip: String = 'Please, configure timeline:';
  public periodicTaskInProgress: Boolean = false;
  public refreshButtonActive: Boolean = false;

  public leftTitle = '';
  public centerTitle = '';
  public rightTitle = '';

  constructor(private _timeService: ShareTimeService,
              private _timestamps: PossibleTimestampsService) {
  }

  ngOnInit() {
    this._timeService.getMax().subscribe(maxValue => {
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
    this.errorTooltip = '';
    this.showErrorInitialScreen = false;

    this._timestamps
      .getTimestamps(this.configuration.url).pipe(
      takeWhile(() => !this.initialized),
      finalize(() => this.initialized = true),
      catchError(error => {
        this.errorTooltip = this.getErrorMessageFromThrownException(error);
        this.showErrorInitialScreen = true;
        throw error;
      })
    ).subscribe((response: TimestampsWithStep) => {
      this.setNewData(response);
      if (this.configuration.period !== 0) {
        this.initializePeriodicalCheck();
      }
    });
  }

  private setNewData(data: TimestampsWithStep): void {
    this._timeService.setMin(data.timestamps[0]);
    this._timeService.setMax(data.timestamps[1]);
    this._timeService.setStep(data.step);
    this._timeService.setRangeChosen([data.timestamps[0], data.timestamps[1]]);
  }

  private initializePeriodicalCheck() {
    this.periodicTaskInProgress = true;
    this.refreshButtonActive = false;
    interval(this.configuration.period * 1000).pipe(
      mergeMap(() =>
        this._timestamps.getTimestamps(this.configuration.url)),
      catchError(error => {
        this.errorTooltip = this.getErrorMessageFromThrownException(error);
        this.periodicTaskInProgress = false;
        this.refreshButtonActive = true;
        throw error;
      })
    ).subscribe((response: TimestampsWithStep) => {
      this._timeService.setMax(response.timestamps[1]);
      this._timeService.setStep(response.step);
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

  private getErrorMessageFromThrownException(error: any): String {
    if (error instanceof HttpErrorResponse) {
      return error.status + ': ' + error.statusText;
    } else if (error.statusText) {
      return error.statusText;
    }
    return 'Unexpected error occurred.';
  }

}
