import {
  Directive, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter,
  ViewContainerRef
} from '@angular/core';
import * as d3 from 'd3';

@Directive({
  selector: '[appD3Slider]'
})
export class D3SliderDirective implements OnInit, OnChanges {

  id: string;
  @Input() disable: string;
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
  @Input() direction: string;
  @Input() isVertical: boolean;

  @Output() valueLeftChange = new EventEmitter();
  @Output() valueRightChange = new EventEmitter();

  @Input() valueLeft: number;
  @Input() valueRight: number;

  constructor (slider: ViewContainerRef) {
    this.maxValue = 1;
    this.minValue = 0;
    this.initialValueLeft = null;
    this.initialValueRight = null;
    this.step = 1;
    this.color = '#51CB3F';
    this.emptyColor = '#AAAAAA';
    this.thumbColor = 'white';
    this.lineWidth = 6;
    this.thumbSize = 6;
    this.thumbStroke = 'black';
    this.thumbStrokeWidth = 1;
    this.direction = 'LTR';
    this.id = slider.element.nativeElement.id;
  }


  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    let selection;
    if ((!this.initialValueLeft) || (changes['initialValueLeft'] && changes['initialValueLeft'].firstChange)) {
      this.initialValueLeft = this.minValue;
    }
    if ((!this.initialValueRight) || (changes['initialValueRight'] && changes['initialValueRight'].firstChange)) {
      this.initialValueRight = this.maxValue;
    }

    if (!this.valueRight) {
      this.valueRight = this.initialValueRight;
    }
    if (!this.valueLeft) {
      this.valueLeft = this.initialValueLeft;
    }

    if (changes['maxValue']) {
      const newValue = changes['maxValue'].currentValue;
      if (newValue < this.valueRight) {
        this.valueRight = newValue;
        this.valueRightChange.emit(newValue);
      }
    }

    if (changes['minValue']) {
      const newValue = changes['minValue'].currentValue;
      if (newValue > this.valueLeft) {
        this.valueLeft = newValue;
        this.valueLeftChange.emit(newValue);
      }
    }

    d3.select('#' + this.id).selectAll('*').remove();
    if (this.isVertical) {
      selection = d3.select('#' + this.id).append('svg')
        .attr('height', this.length + 20)
        .attr('viewBox', '-5,-10,' + '30,' + (this.length + 20));
    } else {
      selection = d3.select('#' + this.id).append('svg')
        .attr('width', this.length + 20)
        .attr('viewBox', '-10,-5,' + (this.length + 20) + ',30');
    }
    this.createSlider(selection);
  }


  createSlider(selection) {
    console.log('createSlider');
    const that = this;
    // const direction = this.direction;
    const width  = this.length;
    let maxValue = this.maxValue;
    const minValue = this.minValue;
    if (minValue > maxValue) {
      maxValue = minValue * 2;
    }
    const valueLeft = this.valueLeft;
    const valueRight = this.valueRight;
    // const color = direction === 'RTL' ? this.emptyColor : this.color;
    // const emptyColor = direction === 'RTL' ? this.color : this.emptyColor;
    const color = this.color;
    const emptyColor = this.emptyColor;

    const thumbColor = this.thumbColor;
    const lineWidth = this.lineWidth;
    const thumbSize = this.thumbSize;
    const thumbStroke = this.thumbStroke;
    const thumbStrokeWidth = this.thumbStrokeWidth;
    let normStep = width / ((maxValue - minValue) / this.step);
    if (normStep > maxValue) {
      normStep = 1;
    }

    // let normValue = this.getNormValue(valueLeft, minValue, maxValue); // value normalized between 0-1
    let normValueLeft = this.getNormValue(valueLeft, minValue, maxValue); // value normalized between 0-1
    let normValueRight = this.getNormValue(valueRight, minValue, maxValue); // value normalized between 0-1
    const mainAxis = this.isVertical ? 'y' : 'x';
    const secondaryAxis = this.isVertical ? 'x' : 'y';

    // let selectedValue;
    let selectedValueLeft;
    let selectedValueRight;

    function dragStartLeft() {
      valueCircleLeft.attr('r', thumbSize + 1);
    }

    function dragStartRight() {
      valueCircleRight.attr('r', thumbSize + 1);
    }

    function dragLeft() {
      // console.log('dragLeft');
      selectedValueLeft = d3.event[mainAxis];
      if (selectedValueLeft < 0) {
        selectedValueLeft = 0;
      } else if (minValue + ((maxValue - minValue) * (selectedValueLeft / width)) > that.valueRight) {
        return;
      } else {
        selectedValueLeft = selectedValueLeft - (selectedValueLeft % normStep);
      }

      normValueLeft = selectedValueLeft / width;
      valueCircleLeft.attr('c' + mainAxis, selectedValueLeft);
      valueLine.attr(mainAxis + '1', selectedValueLeft);
      emptyLineLeft.attr(mainAxis + '1', 0);
      emptyLineLeft.attr(mainAxis + '2', selectedValueLeft);

      d3.event.sourceEvent.stopPropagation();
    }

    function dragRight() {
      selectedValueRight = d3.event[mainAxis];
      if (selectedValueRight > width) {
        selectedValueRight = width;
      } else if (maxValue - ((maxValue - minValue) * (1 - (selectedValueRight / width))) < that.valueLeft + that.step) {
          return;
      } else {
        selectedValueRight = selectedValueRight - (selectedValueRight % normStep);
      }

      normValueRight = selectedValueRight / width;
      valueCircleRight.attr('c' + mainAxis, selectedValueRight);
      valueLine.attr(mainAxis + '2', selectedValueRight);
      emptyLineRight.attr(mainAxis + '1', selectedValueRight);
      emptyLineRight.attr(mainAxis + '2', width);

      d3.event.sourceEvent.stopPropagation();
    }

    function dragEndLeft() {
      console.log('dragEndLeft');
      valueCircleLeft.attr('r', thumbSize);
      if (eventLeft) {
        eventLeft(normValueLeft);
      }
    }
    function dragEndRight() {
      console.log('dragEndRight');
      valueCircleRight.attr('r', thumbSize);
      if (eventRight) {
        eventRight(normValueRight);
      }
    }

    function dragStart() {
      console.log('dragStart');
    }
    function drag() {
      console.log('drag');
    }
    function dragEnd() {
      console.log('dragEnd');
    }


    // Line to represent the current value
    const valueLine = selection.append('line')
      .attr(mainAxis + '1', width * normValueLeft)
      .attr(mainAxis + '2', width * normValueRight)
      .attr(secondaryAxis + '1', 10)
      .attr(secondaryAxis + '2', 10)
      .style('stroke', color)
      .style('stroke-linecap', 'round')
      .style('stroke-width', lineWidth);

    // Line to show the remaining left value
    const emptyLineLeft = selection.append('line')
      .attr(mainAxis + '1', 0)
      .attr(mainAxis + '2', width * normValueLeft)
      .attr(secondaryAxis + '1', 10)
      .attr(secondaryAxis + '2', 10)
      .style('stroke', emptyColor)
      .style('stroke-linecap', 'round')
      .style('stroke-width', lineWidth);

    // Line to show the remaining right value
    const emptyLineRight = selection.append('line')
      .attr(mainAxis + '1', width * normValueRight)
      .attr(mainAxis + '2', width)
      .attr(secondaryAxis + '1', 10)
      .attr(secondaryAxis + '2', 10)
      .style('stroke', emptyColor)
      .style('stroke-linecap', 'round')
      .style('stroke-width', lineWidth);

    // Draggable circle to represent the left value
    const valueCircleLeft = selection.append('circle')
      .attr('c' + mainAxis, width * normValueLeft)
      .attr('c' + secondaryAxis, 10)
      .attr('r', thumbSize)
      .style('stroke', thumbStroke)
      .style('stroke-width', thumbStrokeWidth)
      .style('fill', thumbColor);

    // Draggable circle to represent the right value
    const valueCircleRight = selection.append('circle')
      .attr('c' + mainAxis, width * normValueRight)
      .attr('c' + secondaryAxis, 10)
      .attr('r', thumbSize)
      .style('stroke', thumbStroke)
      .style('stroke-width', thumbStrokeWidth)
      .style('fill', thumbColor);

    if (that.disable !== 'disable') {
      valueCircleLeft.call(d3.drag()
        .on('start', dragStartLeft)
        .on('drag', dragLeft)
        .on('end', dragEndLeft))
        .style('cursor', 'hand');
      valueCircleRight.call(d3.drag()
        .on('start', dragStartRight)
        .on('drag', dragRight)
        .on('end', dragEndRight))
        .style('cursor', 'hand');
      valueLine.call(d3.drag()
        .on('start', dragStart)
        .on('drag', drag)
        .on('end', dragEnd))
        .style('cursor', 'e-resize');
    }

    function eventLeft(iNewValue) {
      that.valueLeft = that.getDenormValue(iNewValue, minValue, maxValue);
      that.valueLeftChange.emit(that.valueLeft);
    }

    function eventRight(iNewValue) {
      that.valueRight = that.getDenormValue(iNewValue, minValue, maxValue);
      that.valueRightChange.emit(that.valueRight);
    }

  }

  /**
   * Normalizes the values to a range between 0 to 1
   * @param iValue
   * @param iMinValue
   * @param iMaxValue
   * @returns {number}
   */
  getNormValue(iValue: number, iMinValue: number, iMaxValue: number) {
    return (iValue - iMinValue) / (iMaxValue - iMinValue);
  }

  /**
   * Converts to normalized value according to the min-max range given
   * @param iValue
   * @param iMinValue
   * @param iMaxValue
   * @returns {Number}
   */
  getDenormValue(iValue: number, iMinValue: number, iMaxValue: number): number {
    return Number((iValue * (iMaxValue - iMinValue) + iMinValue).toFixed(2));
  }

}
