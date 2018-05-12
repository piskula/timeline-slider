import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/index';

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
    if (value !== previousValue) {  // notify about change only if there is change
      this.max$.next(value);

      // check error situations -> if new MAX value is less than previous
      const resultRangeChosen = [this.rangeChosen$.getValue()[0], this.rangeChosen$.getValue()[1]];
      if (value < resultRangeChosen[0]) {
        resultRangeChosen[0] = this.min$.getValue();
      }
      if (value < resultRangeChosen[1]) {
        resultRangeChosen[1] = value;
      }

      // when some lockers are active, refresh chosen range
      if (this.isLockedRight$.getValue()) {
        resultRangeChosen[1] = value;
        if (!this.isLockedLeft$.getValue()) {
          const diff = value.valueOf() - previousValue.valueOf();
          if (diff > 0) {
            resultRangeChosen[0] = this.rangeChosen$.getValue()[0].valueOf() + diff;
          }
        }
      }

      if (resultRangeChosen[0] !== this.rangeChosen$.getValue()[0]
        || resultRangeChosen[1] !== this.rangeChosen$.getValue()[1]) {
        this.setRangeChosen(resultRangeChosen);
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
    }
    this.isLockedRight$.next(isRightLocked);
    this.setLockedLeft(isRightLocked);
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
