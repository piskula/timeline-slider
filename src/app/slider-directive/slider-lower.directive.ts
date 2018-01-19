import { Directive, ViewContainerRef } from '@angular/core';
import * as d3 from 'd3';

import { TimelineScaleComponent } from '../timeline-frame/timeline-scale/timeline-scale.component';
import { D3SliderBaseDirective } from './slider-base.directive';

export const COLOR_STROKE = '#DB56C4';
export const COLOR_EMPTY_STROKE = '#AAAAAA';
export const LINE_WIDTH = 6;

@Directive({
  selector: '[appD3SliderLower]'
})
export class D3SliderLowerDirective extends D3SliderBaseDirective {

  tooltipWidth = 48;
  halfTooltipWidth = 24;

  constructor (slider: ViewContainerRef) {
    super();
    this.maxValue = 1;
    this.minValue = 0;
    this.step = 1;
    this.id = slider.element.nativeElement.id;
  }

  // Override
  createSlider(selection) {
    const that = this;

    const width  = this.getWidth();
    const normStep = this.getNormStep();

    let normValueLeft = this.getNormValue(this.rangeChosen[0]); // value normalized between 0-1
    let normValueRight = this.getNormValue(this.rangeChosen[1]); // value normalized between 0-1

    let selectedValueLeft;
    let selectedValueRight;

    function dragLeft() {
      selectedValueLeft = d3.event['x'] - that.sliderSideMargin;
      if (selectedValueLeft < 0) {
        selectedValueLeft = 0;
      } else if (that.minValue + ((that.maxValue - that.minValue) * (selectedValueLeft / width)) > that.rangeChosen[1]) {
        return;
      } else {
        selectedValueLeft = selectedValueLeft - (selectedValueLeft % normStep);
      }

      normValueLeft = selectedValueLeft / width;

      // lower diff
      leftHandler.attr('x', that.sliderSideMargin + selectedValueLeft - that.halfTooltipWidth);
      leftTooltip.attr('x', that.sliderSideMargin + selectedValueLeft - that.halfTooltipWidth);
      leftTooltip.text(TimelineScaleComponent.getPipeTooltip(that.getDenormValue(normValueLeft), that.maxValue, that.minValue));

      valueLine.attr('x1', that.sliderSideMargin + selectedValueLeft);
      emptyLineLeft.attr('x1', that.sliderSideMargin);
      emptyLineLeft.attr('x2', that.sliderSideMargin + selectedValueLeft);

      d3.event.sourceEvent.stopPropagation();
    }

    function dragRight() {
      selectedValueRight = d3.event['x'] - that.sliderSideMargin;
      if (selectedValueRight > width) {
        selectedValueRight = width;
      } else if (that.maxValue - ((that.maxValue - that.minValue) * (1 - (selectedValueRight / width))) < that.rangeChosen[0] + that.step) {
          return;
      } else {
        selectedValueRight = selectedValueRight - (selectedValueRight % normStep);
      }

      normValueRight = selectedValueRight / width;

      // lower diff
      rightHandler.attr('x', that.sliderSideMargin + selectedValueRight - that.halfTooltipWidth);
      rightTooltip.attr('x', that.sliderSideMargin + selectedValueRight - that.halfTooltipWidth);
      rightTooltip.text(TimelineScaleComponent.getPipeTooltip(that.getDenormValue(normValueRight), that.maxValue, that.minValue));

      valueLine.attr('x2', that.sliderSideMargin + selectedValueRight);
      emptyLineRight.attr('x1', that.sliderSideMargin + selectedValueRight);
      emptyLineRight.attr('x2', that.sliderSideMargin + width);

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
      .attr('x1', this.sliderSideMargin + (width * normValueLeft))
      .attr('x2', this.sliderSideMargin + (width * normValueRight))
      .attr('y1', this.sliderTopMargin + 10)
      .attr('y2', this.sliderTopMargin + 10)
      .style('stroke', COLOR_STROKE)
      .style('stroke-linecap', 'round')
      .style('stroke-width', LINE_WIDTH);

    // Line to show the remaining left value
    const emptyLineLeft = selection.append('line')
      .attr('x1', this.sliderSideMargin)
      .attr('x2', this.sliderSideMargin + (width * normValueLeft))
      .attr('y1', this.sliderTopMargin + 10)
      .attr('y2', this.sliderTopMargin + 10)
      .style('stroke', COLOR_EMPTY_STROKE)
      .style('stroke-linecap', 'round')
      .style('stroke-width', LINE_WIDTH);

    // Line to show the remaining right value
    const emptyLineRight = selection.append('line')
      .attr('x1', this.sliderSideMargin + (width * normValueRight))
      .attr('x2', this.sliderSideMargin + width)
      .attr('y1', this.sliderTopMargin + 10)
      .attr('y2', this.sliderTopMargin + 10)
      .style('stroke', COLOR_EMPTY_STROKE)
      .style('stroke-linecap', 'round')
      .style('stroke-width', LINE_WIDTH);

    let leftHandler;
    let rightHandler;
    let leftTooltip;
    let rightTooltip;
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
      .text(TimelineScaleComponent.getPipeTooltip(that.getDenormValue(normValueLeft), this.maxValue, this.minValue));
    rightTooltip = selection.append('text')
      .attr('x', this.sliderSideMargin + (width * normValueRight) - this.halfTooltipWidth)
      .attr('dx', '1.5em')
      .attr('y', this.sliderTopMargin)
      .attr('dy', '1em')
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
