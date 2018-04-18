import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class PossibleTimestampsService {

  private counter = 1;

  constructor(private _http: HttpClient) { }

  public getTimestamps(url: string): Observable<TimestampsWithStep> {
    // return this._http
    //   .get<TimestampsResponse>(url + (this.counter++ % 7))
    //   .map(response => {
    //
    //     const timestamps: number[] = response.timestamps;
    //     const length = timestamps.length;
    //
    //     if (length < 2 || timestamps[0] >= timestamps[1]) {
    //       throw new Error('Wrong format of timestamps.');
    //     }
    //
    //     return new TimestampsWithStep(
    //       [timestamps[0], timestamps[length - 1]],
    //       timestamps[1] - timestamps[0]
    //     );
    //   });
    return Observable.of(this.getMockTimestamps(this.counter++ % 7))
  }

  private getMockTimestamps(index: number): TimestampsWithStep {
    switch (index) {
      case 0: throw new HttpResponse({ status: 422, statusText: 'Cannot find server' });
      case 1: return new TimestampsWithStep([1455195000, 1455195120], 20);
      case 2: return new TimestampsWithStep([1455195000, 1455195240], 20);
      case 3: return new TimestampsWithStep([1455195000, 1455195360], 20);
      case 4: return new TimestampsWithStep([1455195000, 1455215360], 20);
      case 5: return new TimestampsWithStep([1455195000, 1455235360], 20);
      default: return new TimestampsWithStep([1455195000, 1455295360], 20);
    }
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
