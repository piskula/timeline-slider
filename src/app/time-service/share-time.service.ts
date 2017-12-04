import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShareTimeService {

  private lastRangeChosen: Number[];
  private lastMax: Number;
  private lastMin: Number;
  private lastIsLocked: Boolean;

  private rangeChosen: Subject<Number[]> = new Subject<Number[]>();
  private max: Subject<Number> = new Subject<Number>();
  private min: Subject<Number> = new Subject<Number>();
  private isLockedValue: Subject<Boolean> = new Subject<Boolean>();

  constructor() { }

  public getRangeChosen(): Observable<Number[]> {
    return this.rangeChosen.asObservable();
  }

  public setRangeChosen(value: Number[]) {
    if (this.lastIsLocked && value[1] !== this.lastMax) {
      this.setLocked(false);
    }
    this.lastRangeChosen = value;
    this.rangeChosen.next(value);
  }

  public getLastRangeChosen(): Number[] {
    return this.lastRangeChosen;
  }

  public getMax(): Observable<Number> {
    return this.max.asObservable();
  }

  public setMax(value: Number) {
    this.lastMax = value;
    this.max.next(value);
    if (this.lastIsLocked) {
      this.setRangeChosen([this.lastRangeChosen[0], value]);
    }
  }

  public getLastMax(): Number {
    return this.lastMax;
  }

  public getMin(): Observable<Number> {
    return this.min.asObservable();
  }

  public setMin(value: Number) {
    this.lastMin = value;
    this.max.next(value);
  }

  public getLastMin(): Number {
    return this.lastMin;
  }

  public isLocked(): Observable<Boolean> {
    return this.isLockedValue.asObservable();
  }

  public setLocked(value: Boolean) {
    if (value) {
      this.setRangeChosen([this.lastRangeChosen[0], this.lastMax]);
      this.lastIsLocked = true;
      this.isLockedValue.next(true);
    } else {
      this.lastIsLocked = false;
      this.isLockedValue.next(false);
    }
  }

  public getLastIsLocked(): Boolean {
    return this.lastIsLocked;
  }

}
