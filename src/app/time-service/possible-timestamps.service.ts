import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMap'

@Injectable()
export class PossibleTimestampsService {

  private counter = 1;

  constructor(private _http: HttpClient) { }

  public getTimestamps(): Observable<TimestampsWithStep> {
    return this._http
      .get<TimestampsResponse>('http://localhost:3004/all-timestamps/' + (this.counter++ % 5))
      .map(response => {

        const timestamps: number[] = response.timestamps;
        const length = timestamps.length;

        if (length < 2 || timestamps[0] >= timestamps[1]) {
          throw new Error('Wrong format of timestamps.');
        }

        return new TimestampsWithStep(
          [timestamps[0], timestamps[length - 1]],
          timestamps[1] - timestamps[0]
        );
      });
  }
}


export interface TimestampsResponse {
  timestamps: number[];
}

export class TimestampsWithStep {

  timestamps: number[];
  step: number;

  constructor(timestamps: number[], step: number) {
    this.timestamps = timestamps;
    this.step = step;
  }

}