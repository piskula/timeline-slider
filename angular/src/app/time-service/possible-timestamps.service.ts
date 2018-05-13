import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs/index';
import { map } from 'rxjs/operators';

@Injectable()
export class PossibleTimestampsService {

  private counter = 4;

  constructor(private _http: HttpClient) {
  }

  public getTimestamps(url: string): Observable<TimestampsWithStep> {
    // return this._http
    //   .get<TimestampsResponse>(url + (this.counter++ % 7)).pipe(
    //     map(response => {
    //
    //       const timestamps: number[] = response.timestamps;
    //       const length = timestamps.length;
    //
    //       if (length < 2 || timestamps[0] >= timestamps[1]) {
    //         throw new Error('Wrong format of timestamps.');
    //       }
    //
    //       return new TimestampsWithStep(
    //         [timestamps[0], timestamps[length - 1]],
    //         timestamps[1] - timestamps[0]
    //       );
    //     }),
    //     map(timestamp => this.correctEndTimestampNotFitStep(timestamp))
    //   );
    return of(this.getMockTimestamps(this.counter++ % 7)).pipe(
      map(timestamp => this.correctEndTimestampNotFitStep(timestamp))
    );
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

  /*
   * we have to handle situations when end timestamp does not fit to step according to start timestamp
   * e.g. we start on value 100 with step 5, so we have timestamps 100, 105, 110, 115... but
   * we end on 117, which does not fit step, so for this purpose we extend end to nearest valid value,
   * in this case to 120
   */
  private correctEndTimestampNotFitStep(t: TimestampsWithStep): TimestampsWithStep {
    const remainder = (t.timestamps[1] - t.timestamps[0]) % t.step;
    if (remainder === 0) {
      return t;
    }

    t.timestamps[1] = t.timestamps[1] - remainder + t.step;
    return t;
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
