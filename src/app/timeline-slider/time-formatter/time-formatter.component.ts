import {NouiFormatter} from 'ng2-nouislider';
import * as moment from 'moment';

export class TimeFormatter implements NouiFormatter {

  format: string;

  public setFormat(format: string) {
    this.format = format;
  }

  to(value: number): string {
    const date = new Date(value * 1000);
    return moment(date).utc().format(this.format);
  };

  from(value: string): number {
    const v = value.split(':').map(parseInt);
    let time = 0;
    time += v[0] * 3600;
    time += v[1] * 60;
    // time += v[2];
    return time;
  }

  constructor () {
    this.format = 'HH:mm:ss';
  }
}
