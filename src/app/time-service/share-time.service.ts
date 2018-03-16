import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ShareTimeService {

  private rangeChosen$: BehaviorSubject<Number[]> = new BehaviorSubject<Number[]>([]);
  private max$: BehaviorSubject<Number> = new BehaviorSubject<Number>(null);
  private min$: BehaviorSubject<Number> = new BehaviorSubject<Number>(null);
  private isLockedRight$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  private isLockedLeft$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor() { }

  public getRangeChosen(): BehaviorSubject<Number[]> {
    return this.rangeChosen$;
  }

  public setRangeChosen(value: Number[]) {
    if (this.isLockedRight$.getValue() && value[1] !== this.max$.getValue()) {
      this.setLockedRight(false);
    }
    this.rangeChosen$.next(value);
  }

  public getMax(): BehaviorSubject<Number> {
    return this.max$;
  }

  public setMax(value: Number) {
    const previousValue = this.max$.getValue();
    this.max$.next(value);
    if (this.isLockedRight$.getValue()) {
      if (this.isLockedLeft$.getValue()) {
        this.setRangeChosen([this.rangeChosen$.getValue()[0], value]);
      } else {
        const diff = value.valueOf() - previousValue.valueOf();
        this.setRangeChosen([this.rangeChosen$.getValue()[0].valueOf() + diff, value]);
      }
    }
  }

  public getMin(): BehaviorSubject<Number> {
    return this.min$;
  }

  public setMin(value: Number) {
    this.min$.next(value);
  }

  public isLockedRight(): BehaviorSubject<Boolean> {
    return this.isLockedRight$;
  }

  public setLockedRight(isRightLocked: Boolean) {
    if (isRightLocked) {
      this.setRangeChosen([this.rangeChosen$.getValue()[0], this.max$.getValue()]);
      this.isLockedRight$.next(true);
      this.setLockedLeft(true);
    } else {
      this.isLockedRight$.next(false);
      this.setLockedLeft(false);
    }
  }

  public isLockedLeft(): BehaviorSubject<Boolean> {
    return this.isLockedLeft$;
  }

  public setLockedLeft(isLeftLocked: Boolean) {
    const valueWithRightLock = isLeftLocked && this.isLockedRight$.getValue();
    if (this.isLockedLeft$.getValue() !== valueWithRightLock) {
      this.isLockedLeft$.next(valueWithRightLock);
    }
  }

}
