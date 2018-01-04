import {EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import * as d3 from 'd3';

export class D3SliderBaseDirective implements OnChanges {
  id: string;
  sliderTopMargin = 25;
  sliderSideMargin = 30;

  @Input() length: number;
  @Input() maxValue: number;
  @Input() minValue: number;
  @Input() initialValueLeft: number;
  @Input() initialValueRight: number;
  @Input() step: number;
  @Input() lineWidth: number;
  @Input() color: string;
  @Input() emptyColor: string;
  @Input() thumbColor: string;
  @Input() thumbSize: number;
  @Input() thumbStroke: string;
  @Input() thumbStrokeWidth: number;

  @Output() rangeChosenChange = new EventEmitter();
  @Input() rangeChosen: number[];

  // you must override this method
  createSlider(selection) { }

  ngOnChanges(changes: SimpleChanges) {
    let selection;
    if ((!this.initialValueLeft) || (changes['initialValueLeft'] && changes['initialValueLeft'].firstChange)) {
      this.initialValueLeft = this.minValue;
    }
    if ((!this.initialValueRight) || (changes['initialValueRight'] && changes['initialValueRight'].firstChange)) {
      this.initialValueRight = this.maxValue;
    }

    if (!this.rangeChosen[1]) {
      this.rangeChosen[1] = this.initialValueRight;
    }
    if (!this.rangeChosen[0]) {
      this.rangeChosen[0] = this.initialValueLeft;
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
      .attr('width', Number(this.length))
      .attr('viewBox', '0,0,' + (Number(this.length)) + ',50');

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
    return Number((iValue * (this.maxValue - this.minValue) + this.minValue).toFixed(2));
  }

  public getWidth(): number {
    return this.length - (this.sliderSideMargin * 2);
  }

  public getNormStep(): number {
    let result =  this.getWidth() / ((this.maxValue - this.minValue) / this.step);
    if (result > this.maxValue) {
      result = 1;
    }
    return result;
  }
}
