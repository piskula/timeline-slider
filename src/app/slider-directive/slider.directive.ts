import {
  Directive, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter,
  ViewContainerRef
} from '@angular/core';
import * as d3 from 'd3';
import {TimelineScaleComponent} from '../timeline-frame/timeline-scale/timeline-scale.component';

@Directive({
  selector: '[appD3Slider]'
})
export class D3SliderDirective implements OnInit, OnChanges {

  id: string;
  sliderTopMargin = 25;
  sliderSideMargin = 30;
  tooltipWidth = 48;
  halfTooltipWidth = 24;

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
  @Input() isLowerSlider: Boolean;

  @Output() rangeChosenChange = new EventEmitter();
  @Input() rangeChosen: number[];

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
    this.id = slider.element.nativeElement.id;
    this.isLowerSlider = true;
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


  createSlider(selection) {
    const that = this;

    const width  = this.length - (this.sliderSideMargin * 2);
    let maxValue = this.maxValue;
    const minValue = this.minValue;
    if (minValue > maxValue) {
      maxValue = minValue * 2;
    }
    const valueLeft = this.rangeChosen[0];
    const valueRight = this.rangeChosen[1];

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

    let normValueLeft = this.getNormValue(valueLeft, minValue, maxValue); // value normalized between 0-1
    let normValueRight = this.getNormValue(valueRight, minValue, maxValue); // value normalized between 0-1

    let selectedValueLeft;
    let selectedValueRight;

    function dragStartLeft() {
      // valueCircleLeft.attr('r', thumbSize + 1);
    }

    function dragStartRight() {
      // valueCircleRight.attr('r', thumbSize + 1);
    }

    function dragLeft() {
      selectedValueLeft = d3.event['x'] - that.sliderSideMargin;
      if (selectedValueLeft < 0) {
        selectedValueLeft = 0;
      } else if (minValue + ((maxValue - minValue) * (selectedValueLeft / width)) > that.rangeChosen[1]) {
        return;
      } else {
        selectedValueLeft = selectedValueLeft - (selectedValueLeft % normStep);
      }

      normValueLeft = selectedValueLeft / width;
      if (that.isLowerSlider) {
        leftHandler.attr('x', that.sliderSideMargin + selectedValueLeft - that.halfTooltipWidth);
        leftTooltip.attr('x', that.sliderSideMargin + selectedValueLeft - that.halfTooltipWidth);
        leftTooltip.text(TimelineScaleComponent.getPipeTooltip(that.getDenormValue(normValueLeft, minValue, maxValue), maxValue, minValue));
      } else {
        leftHandler.attr('cx', that.sliderSideMargin + selectedValueLeft);
      }
      valueLine.attr('x1', that.sliderSideMargin + selectedValueLeft);
      emptyLineLeft.attr('x1', that.sliderSideMargin);
      emptyLineLeft.attr('x2', that.sliderSideMargin + selectedValueLeft);

      d3.event.sourceEvent.stopPropagation();
    }

    function dragRight() {
      selectedValueRight = d3.event['x'] - that.sliderSideMargin;
      if (selectedValueRight > width) {
        selectedValueRight = width;
      } else if (maxValue - ((maxValue - minValue) * (1 - (selectedValueRight / width))) < that.rangeChosen[0] + that.step) {
          return;
      } else {
        selectedValueRight = selectedValueRight - (selectedValueRight % normStep);
      }

      normValueRight = selectedValueRight / width;
      if (that.isLowerSlider) {
        rightHandler.attr('x', that.sliderSideMargin + selectedValueRight - that.halfTooltipWidth);
        rightTooltip.attr('x', that.sliderSideMargin + selectedValueRight - that.halfTooltipWidth);
        rightTooltip.text(TimelineScaleComponent.getPipeTooltip(that.getDenormValue(normValueRight, minValue, maxValue), maxValue, minValue));
      } else {
        rightHandler.attr('cx', that.sliderSideMargin + selectedValueRight);
      }
      valueLine.attr('x2', that.sliderSideMargin + selectedValueRight);
      emptyLineRight.attr('x1', that.sliderSideMargin + selectedValueRight);
      emptyLineRight.attr('x2', that.sliderSideMargin + width);

      d3.event.sourceEvent.stopPropagation();
    }

    function dragEndLeft() {
      // valueCircleLeft.attr('r', thumbSize);
      if (eventLeft) {
        eventLeft(normValueLeft);
      }
    }
    function dragEndRight() {
      // valueCircleRight.attr('r', thumbSize);
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
      .attr('x1', this.sliderSideMargin + (width * normValueLeft))
      .attr('x2', this.sliderSideMargin + (width * normValueRight))
      .attr('y1', this.sliderTopMargin + 10)
      .attr('y2', this.sliderTopMargin + 10)
      .style('stroke', color)
      .style('stroke-linecap', 'round')
      .style('stroke-width', lineWidth);

    // Line to show the remaining left value
    const emptyLineLeft = selection.append('line')
      .attr('x1', this.sliderSideMargin)
      .attr('x2', this.sliderSideMargin + (width * normValueLeft))
      .attr('y1', this.sliderTopMargin + 10)
      .attr('y2', this.sliderTopMargin + 10)
      .style('stroke', emptyColor)
      .style('stroke-linecap', 'round')
      .style('stroke-width', lineWidth);

    // Line to show the remaining right value
    const emptyLineRight = selection.append('line')
      .attr('x1', this.sliderSideMargin + (width * normValueRight))
      .attr('x2', this.sliderSideMargin + width)
      .attr('y1', this.sliderTopMargin + 10)
      .attr('y2', this.sliderTopMargin + 10)
      .style('stroke', emptyColor)
      .style('stroke-linecap', 'round')
      .style('stroke-width', lineWidth);

    let leftHandler;
    let rightHandler;
    let leftTooltip;
    let rightTooltip;
    if (this.isLowerSlider) {
      leftHandler = selection.append('rect')
        .attr('x', this.sliderSideMargin + (width * normValueLeft) - this.halfTooltipWidth)
        .attr('y', this.sliderTopMargin)
        .attr('rx', '0.3em')
        .attr('ry', '0.3em')
        .attr('width', this.tooltipWidth)
        .attr('height', '1.2em')
        .style('fill', '#FFFFFF')
        .style('stroke', '#444444')
        .style('stroke-width', 1);
      rightHandler = selection.append('rect')
        .attr('x', this.sliderSideMargin + (width * normValueRight) - this.halfTooltipWidth)
        .attr('y', this.sliderTopMargin)
        .attr('rx', '0.3em')
        .attr('ry', '0.3em')
        .attr('width', this.tooltipWidth)
        .attr('height', '1.2em')
        .style('fill', '#FFFFFF')
        .style('stroke', '#444444')
        .style('stroke-width', 1);
      leftTooltip = selection.append('text')
        .attr('x', this.sliderSideMargin + (width * normValueLeft) - this.halfTooltipWidth)
        .attr('dx', '1.5em')
        .attr('y', this.sliderTopMargin)
        .attr('dy', '1em')
        .attr('text-anchor', 'middle')
        .style('pointer-events', 'none')
        .text(TimelineScaleComponent.getPipeTooltip(that.getDenormValue(normValueLeft, minValue, maxValue), maxValue, minValue));
      rightTooltip = selection.append('text')
        .attr('x', this.sliderSideMargin + (width * normValueRight) - this.halfTooltipWidth)
        .attr('dx', '1.5em')
        .attr('y', this.sliderTopMargin)
        .attr('dy', '1em')
        .attr('text-anchor', 'middle')
        .style('pointer-events', 'none')
        .text(TimelineScaleComponent.getPipeTooltip(that.getDenormValue(normValueRight, minValue, maxValue), maxValue, minValue));
    } else {
      leftHandler = selection.append('circle')
        .attr('cx', this.sliderSideMargin + (width * normValueLeft))
        .attr('cy', this.sliderTopMargin + 10)
        .attr('r', thumbSize)
        .style('stroke', thumbStroke)
        .style('stroke-width', thumbStrokeWidth)
        .style('fill', thumbColor);
      rightHandler = selection.append('circle')
        .attr('cx', this.sliderSideMargin + (width * normValueRight))
        .attr('cy', this.sliderTopMargin + 10)
        .attr('r', thumbSize)
        .style('stroke', thumbStroke)
        .style('stroke-width', thumbStrokeWidth)
        .style('fill', thumbColor);
    }

    // const tooltipLeftValue = selection.append('text')
    //   .attr('x', 4)
    //   .attr('y', 10)
    //   .attr('dy', '.35em')
    //   .text('14:35');

    leftHandler.call(d3.drag()
      .on('start', dragStartLeft)
      .on('drag', dragLeft)
      .on('end', dragEndLeft))
      .style('cursor', 'hand');
    rightHandler.call(d3.drag()
      .on('start', dragStartRight)
      .on('drag', dragRight)
      .on('end', dragEndRight))
      .style('cursor', 'hand');
    valueLine.call(d3.drag()
      .on('start', dragStart)
      .on('drag', drag)
      .on('end', dragEnd))
      .style('cursor', 'e-resize');

    function eventLeft(iNewValue) {
      that.rangeChosen[0] = that.getDenormValue(iNewValue, minValue, maxValue);
      that.rangeChosenChange.emit([that.rangeChosen[0], that.rangeChosen[1]]);
    }

    function eventRight(iNewValue) {
      that.rangeChosen[1] = that.getDenormValue(iNewValue, minValue, maxValue);
      that.rangeChosenChange.emit([that.rangeChosen[0], that.rangeChosen[1]]);
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
