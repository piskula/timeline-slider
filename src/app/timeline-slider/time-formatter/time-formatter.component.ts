import {NouiFormatter} from 'ng2-nouislider';
import * as moment from 'moment';

export class TimeFormatter implements NouiFormatter {

  format: string;

  to(value: number): string {
    const date = new Date(value * 1000);
    return moment(date).utc().format(this.format);
  };

  from(value: string): number {
    const v = value.split(':').map(parseInt);
    let time = 0;
    time += v[0] * 3600;
    time += v[1] * 60;
    return time;
  }

  constructor () {
    this.format = 'HH:mm:ss';
  }

  public setRange(range: number[]) {
    if ((range[1] - range[0]) < 3600) {
      this.format = 'HH:mm:ss';
    } else {
      this.format = 'HH:mm';
    }
  }
}
