import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShareTimeService {

  private lastRangeChosen: Number[];
  private lastMax: Number;
  private lastMin: Number;
  private lastIsLockedRight: Boolean;
  private lastIsLockedLeft: Boolean;

  private rangeChosen: Subject<Number[]> = new Subject<Number[]>();
  private max: Subject<Number> = new Subject<Number>();
  private min: Subject<Number> = new Subject<Number>();
  private isLockedRightValue: Subject<Boolean> = new Subject<Boolean>();
  private isLockedLeftValue: Subject<Boolean> = new Subject<Boolean>();

  constructor() { }

  public getRangeChosen(): Observable<Number[]> {
    return this.rangeChosen.asObservable();
  }

  public setRangeChosen(value: Number[]) {
    if (this.lastIsLockedRight && value[1] !== this.lastMax) {
      this.setLockedRight(false);
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
    if (this.lastIsLockedRight) {
      if (this.lastIsLockedLeft) {
        this.setRangeChosen([this.lastRangeChosen[0], value]);
      } else {
        const diff = value.valueOf() - previousValue.valueOf();
        this.setRangeChosen([this.lastRangeChosen[0].valueOf() + diff, value]);
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

  public isLockedRight(): Observable<Boolean> {
    return this.isLockedRightValue.asObservable();
  }

  public isLockedLeft(): Observable<Boolean> {
    return this.isLockedLeftValue.asObservable();
  }

  public setLockedRight(isRightLocked: Boolean) {
    if (isRightLocked) {
      this.setRangeChosen([this.lastRangeChosen[0], this.lastMax]);
      this.lastIsLockedRight = true;
      this.isLockedRightValue.next(true);
      this.setLockedLeft(true);
    } else {
      this.lastIsLockedRight = false;
      this.isLockedRightValue.next(false);
      this.setLockedLeft(false);
    }
  }

  public setLockedLeft(isLeftLocked: Boolean) {
    const valueWithRightLock = isLeftLocked && this.getLastIsLocked();
    if (this.lastIsLockedLeft !== valueWithRightLock) {
      this.lastIsLockedLeft = valueWithRightLock;
      this.isLockedLeftValue.next(valueWithRightLock);
    }
  }

  public getLastIsLocked(): Boolean {
    return this.lastIsLockedRight;
  }

  public getLastIsLockedLeft(): Boolean {
    return this.lastIsLockedLeft;
  }

}
