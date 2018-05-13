import { Directive } from '@angular/core';
import * as d3 from 'd3';

import { TimelineScaleComponent } from '../timeline-frame/timeline-scale/timeline-scale.component';
import {
  COLOR_LOWER,
  COLOR_THUMB,
  D3SliderBaseDirective,
  GREY_LOW,
} from './slider-base.directive';

export const LINE_HEIGHT_MULTIPLY = 0.5;
export const LINE_EMPTY_HEIGHT_MULTIPLY = 0.75;

@Directive({
  selector: '[appD3SliderLower]'
})
export class D3SliderLowerDirective extends D3SliderBaseDirective {

  constructor () {
    super();
    this.id = 'sliderLower';
  }

  // Override
  createSlider(selection) {
    const that = this;

    // variables, which modify design
    const width = this.getWidth();
    const fontSize = this.getFontSize();
    const sliderSideMargin = this.getSideMargin();
    const halfTooltipWidth = fontSize * 2.25;
    const tooltipWidth = halfTooltipWidth * 2;
    const tooltipHeight = fontSize * 1.25;
    const tooltipCornerRadius = fontSize * 0.25;
    const sliderTopMarginTooltip = fontSize * 0.5;
    const sliderTopMargin = fontSize * 1.125;

    let normValueLeft = this.getNormValue(this.rangeChosen[0]); // value normalized between 0-1
    let normValueRight = this.getNormValue(this.rangeChosen[1]); // value normalized between 0-1

    let selectedValueLeft;
    let selectedValueRight;

    function dragLeft() {
      const _normValue = (d3.event['x'] - sliderSideMargin) / width;
      let denormLeft = that.getDenormValue(_normValue);

      // if left handler is outside area
      if (denormLeft < that.minValue) {
        denormLeft = that.minValue;

      } else {
        // if left handler is after right one
        if (denormLeft + that.step >= that.rangeChosen[1]) {
          denormLeft = that.rangeChosen[1] - that.step;
        }
      }

      // if drag is too small to change value, do not emit the same multiple times
      if (denormLeft === that.getDenormValue(normValueLeft)) {
        return;
      }

      // update value
      normValueLeft = that.getNormValue(denormLeft);
      selectedValueLeft = normValueLeft * width;

      // re-render handler and related elements
      leftHandler.attr('x', sliderSideMargin + selectedValueLeft - halfTooltipWidth);
      leftTooltip
        .attr('x', sliderSideMargin + selectedValueLeft - halfTooltipWidth)
        .text(TimelineScaleComponent.getPipeTooltip(that.getDenormValue(normValueLeft), that.maxValue, that.minValue));
      valueLine.attr('x1', sliderSideMargin + selectedValueLeft);
      emptyLineLeft
        .attr('x1', sliderSideMargin)
        .attr('x2', sliderSideMargin + selectedValueLeft);

      d3.event.sourceEvent.stopPropagation();
    }

    function dragRight() {
      const _normValue = (d3.event['x'] - sliderSideMargin) / width;
      let denormRight = that.getDenormValue(_normValue);

      // if right handler is outside area
      if (denormRight > that.maxValue) {
        denormRight = that.maxValue;

      } else {
        // if right handler is before left one
        if (denormRight - that.step <= that.rangeChosen[0]) {
          denormRight = that.rangeChosen[0] + that.step;
        }
      }

      // if drag is too small to change value, do not emit the same multiple times
      if (denormRight === that.getDenormValue(normValueRight)) {
        return;
      }

      // update value
      normValueRight = that.getNormValue(denormRight);
      selectedValueRight = that.getNormValue(denormRight) * width;

      // re-render handler and related elements
      rightHandler.attr('x', sliderSideMargin + selectedValueRight - halfTooltipWidth);
      rightTooltip
        .attr('x', sliderSideMargin + selectedValueRight - halfTooltipWidth)
        .text(TimelineScaleComponent.getPipeTooltip(that.getDenormValue(normValueRight), that.maxValue, that.minValue));
      valueLine.attr('x2', sliderSideMargin + selectedValueRight);
      emptyLineRight
        .attr('x1', sliderSideMargin + selectedValueRight)
        .attr('x2', sliderSideMargin + width);

      d3.event.sourceEvent.stopPropagation();
    }

    function dragEndLeft() {
      if (eventLeft) {
        eventLeft(normValueLeft);
      }
    }
    function dragEndRight() {
      if (eventRight) {
        eventRight(normValueRight);
      }
    }

    // Line to represent the current value
    const valueLine = selection.append('line')
      .attr('x1', sliderSideMargin + (width * normValueLeft))
      .attr('x2', sliderSideMargin + (width * normValueRight))
      .attr('y1', sliderTopMargin)
      .attr('y2', sliderTopMargin)
      .style('stroke', COLOR_LOWER)
      .style('stroke-linecap', 'round')
      .style('stroke-width', LINE_HEIGHT_MULTIPLY * fontSize);

    // Line to show the remaining left value
    const emptyLineLeft = selection.append('line')
      .attr('x1', sliderSideMargin)
      .attr('x2', sliderSideMargin + (width * normValueLeft))
      .attr('y1', sliderTopMargin)
      .attr('y2', sliderTopMargin)
      .style('stroke', GREY_LOW)
      .style('stroke-linecap', 'butt')
      .style('stroke-width', LINE_EMPTY_HEIGHT_MULTIPLY * fontSize);

    // Line to show the remaining right value
    const emptyLineRight = selection.append('line')
      .attr('x1', sliderSideMargin + (width * normValueRight))
      .attr('x2', sliderSideMargin + width)
      .attr('y1', sliderTopMargin)
      .attr('y2', sliderTopMargin)
      .style('stroke', GREY_LOW)
      .style('stroke-linecap', 'butt')
      .style('stroke-width', LINE_EMPTY_HEIGHT_MULTIPLY * fontSize);

    let leftHandler;
    let rightHandler;
    let leftTooltip;
    let rightTooltip;
    leftHandler = selection.append('rect')
      .attr('x', sliderSideMargin + (width * normValueLeft) - halfTooltipWidth)
      .attr('y', sliderTopMarginTooltip)
      .attr('rx', tooltipCornerRadius)
      .attr('width', tooltipWidth)
      .attr('height', tooltipHeight)
      .style('fill', COLOR_THUMB)
      .style('stroke', COLOR_LOWER)
      .style('stroke-width', 2);
    rightHandler = selection.append('rect')
      .attr('x', sliderSideMargin + (width * normValueRight) - halfTooltipWidth)
      .attr('y', sliderTopMarginTooltip)
      .attr('rx', tooltipCornerRadius)
      .attr('width', tooltipWidth)
      .attr('height', tooltipHeight)
      .style('fill', COLOR_THUMB)
      .style('stroke', COLOR_LOWER)
      .style('stroke-width', 2);
    leftTooltip = selection.append('text')
      .attr('x', sliderSideMargin + (width * normValueLeft) - halfTooltipWidth)
      .attr('dx', halfTooltipWidth)
      .attr('y', sliderTopMarginTooltip)
      .attr('dy', fontSize)
      .attr('text-anchor', 'middle')
      .style('pointer-events', 'none')
      .text(TimelineScaleComponent.getPipeTooltip(that.getDenormValue(normValueLeft), this.maxValue, this.minValue));
    rightTooltip = selection.append('text')
      .attr('x', sliderSideMargin + (width * normValueRight) - halfTooltipWidth)
      .attr('dx', halfTooltipWidth)
      .attr('y', sliderTopMarginTooltip)
      .attr('dy', fontSize)
      .attr('text-anchor', 'middle')
      .style('pointer-events', 'none')
      .text(TimelineScaleComponent.getPipeTooltip(that.getDenormValue(normValueRight), this.maxValue, this.minValue));

    leftHandler.call(d3.drag()
      .on('drag', dragLeft)
      .on('end', dragEndLeft))
      .style('cursor', 'hand');
    rightHandler.call(d3.drag()
      .on('drag', dragRight)
      .on('end', dragEndRight))
      .style('cursor', 'hand');

    function eventLeft(iNewValue) {
      that.rangeChosen[0] = that.getDenormValue(iNewValue);
      that.rangeChosenChange.emit([that.rangeChosen[0], that.rangeChosen[1]]);
    }

    function eventRight(iNewValue) {
      that.rangeChosen[1] = that.getDenormValue(iNewValue);
      that.rangeChosenChange.emit([that.rangeChosen[0], that.rangeChosen[1]]);
    }

  }

}
