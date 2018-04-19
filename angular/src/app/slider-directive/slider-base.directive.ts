import {EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import * as d3 from 'd3';

export const COLOR_THUMB = '#FAFAFA';
export const COLOR_LOWER = '#BE148E';
export const COLOR_UPPER = '#0070C7';
export const DARK_GREY = '#636466';
export const OPACITY_MIDDLE = 0.325;

export class D3SliderBaseDirective implements OnChanges {
  public id: string;

  @Input() maxValue: number;
  @Input() minValue: number;
  @Input() step: number;

  @Input() rangeChosen: number[];
  @Output() rangeChosenChange = new EventEmitter();

  constructor() {
    this.maxValue = 1;
    this.minValue = 0;
    this.step = 1;
  }

  // you must override this method
  createSlider(selection) { }

  ngOnChanges(changes: SimpleChanges) {
    let selection;

    if (!this.rangeChosen[1]) {
      this.rangeChosen[1] = this.minValue;
    }
    if (!this.rangeChosen[0]) {
      this.rangeChosen[0] = this.maxValue;
    }

    if (changes['maxValue']) {
      const newValue = changes['maxValue'].currentValue;
      if (newValue < this.rangeChosen[1]) {
        this.rangeChosen[1] = newValue;
        this.rangeChosenChange.emit([this.rangeChosen[0], newValue]);
      }
    }

    if (changes['minValue']) {
      const newValue = changes['minValue'].currentValue;
      if (newValue > this.rangeChosen[0]) {
        this.rangeChosen[0] = newValue;
        this.rangeChosenChange.emit([newValue, this.rangeChosen[1]]);
      }
    }

    d3.select('#' + this.id).selectAll('*').remove();

    selection = d3.select('#' + this.id).append('svg')
      .attr('width', '100%')
      .attr('height', '100%');

    this.createSlider(selection);
  }

  /**
   * Normalizes the values to a range between 0 to 1
   * @param iValue
   * @returns {number}
   */
  getNormValue(iValue: number) {
    return (iValue - this.minValue) / (this.maxValue - this.minValue);
  }

  /**
   * Converts to normalized value according to the min-max range given
   * @param iValue
   * @returns {Number}
   */
  getDenormValue(iValue: number): number {
    const denorm = iValue * (this.maxValue - this.minValue) + this.minValue;
    const remainder = denorm % this.step;
    let result = denorm - remainder;
    // to fit steps we need float from half up
    if (remainder > (this.step * 0.5)) {
      result += this.step;
    }
    return result;
  }

  public getWidth(): number {
    const selection = d3.select('#' + this.id).select('svg')._groups[0][0];
    return selection.clientWidth - (this.getSideMargin() * 2);
  }

  public getFontSize(): number {
    const fontSizeString: String = window
      .getComputedStyle(document.documentElement, null)
      .getPropertyValue('font-size');

    if (!fontSizeString) {
      return 16;
    }

    fontSizeString.replace('px', '');
    return parseInt(fontSizeString.valueOf(), 10);
  }

  public getSideMargin(): number {
    return this.getFontSize() * 2.5;
  }

  public getNormStep(): number {
    let result =  this.getWidth() / ((this.maxValue - this.minValue) / this.step);
    if (result > this.maxValue) {
      result = 1;
    }
    return result;
  }
}
