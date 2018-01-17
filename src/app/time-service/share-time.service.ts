import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShareTimeService {

  private lastRangeChosen: Number[];
  private lastMax: Number;
  private lastMin: Number;
  private lastIsLocked: Boolean;
  private lastIsLockedLeft: Boolean;

  private rangeChosen: Subject<Number[]> = new Subject<Number[]>();
  private max: Subject<Number> = new Subject<Number>();
  private min: Subject<Number> = new Subject<Number>();
  private isLockedValue: Subject<Boolean> = new Subject<Boolean>();
  private isLockedLeftValue: Subject<Boolean> = new Subject<Boolean>();

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
    const previousValue = this.lastMax;
    this.lastMax = value;
    this.max.next(value);
    if (this.lastIsLocked) {
      if (this.lastIsLockedLeft) {
        const diff = value.valueOf() - previousValue.valueOf();
        this.setRangeChosen([this.lastRangeChosen[0].valueOf() + diff, value]);
      } else {
        this.setRangeChosen([this.lastRangeChosen[0], value]);
      }
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

  public isLockedLeft(): Observable<Boolean> {
    return this.isLockedLeftValue.asObservable();
  }

  public setLocked(value: Boolean) {
    if (value) {
      this.setRangeChosen([this.lastRangeChosen[0], this.lastMax]);
      this.lastIsLocked = true;
      this.isLockedValue.next(true);
    } else {
      this.lastIsLocked = false;
      this.isLockedValue.next(false);
      this.setLockedLeft(false);
    }
  }

  public setLockedLeft(value: Boolean) {
    const valueWithRightLock = value && this.getLastIsLocked();
    if (this.lastIsLockedLeft !== valueWithRightLock) {
      this.lastIsLockedLeft = valueWithRightLock;
      this.isLockedLeftValue.next(valueWithRightLock);
    }
  }

  public getLastIsLocked(): Boolean {
    return this.lastIsLocked;
  }

  public getLastIsLockedLeft(): Boolean {
    return this.lastIsLockedLeft;
  }

}
