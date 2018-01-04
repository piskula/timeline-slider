import { Directive, ViewContainerRef } from '@angular/core';
import * as d3 from 'd3';

import { D3SliderBaseDirective } from './slider-base.directive';

@Directive({
  selector: '[appD3SliderUpper]'
})
export class D3SliderUpperDirective extends D3SliderBaseDirective {

  constructor (slider: ViewContainerRef) {
    super();
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

    function dragStartLeft() {
      leftHandler.attr('r', that.thumbSize + 2);
    }

    function dragStartRight() {
      rightHandler.attr('r', that.thumbSize + 2);
    }

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

      // upper diff
      leftHandler.attr('cx', that.sliderSideMargin + selectedValueLeft);

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

      // upper diff
      rightHandler.attr('cx', that.sliderSideMargin + selectedValueRight);

      valueLine.attr('x2', that.sliderSideMargin + selectedValueRight);
      emptyLineRight.attr('x1', that.sliderSideMargin + selectedValueRight);
      emptyLineRight.attr('x2', that.sliderSideMargin + width);

      d3.event.sourceEvent.stopPropagation();
    }

    function dragEndLeft() {
      leftHandler.attr('r', this.thumbSize);
      if (eventLeft) {
        eventLeft(normValueLeft);
      }
    }
    function dragEndRight() {
      rightHandler.attr('r', this.thumbSize);
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
      .style('stroke', this.color)
      .style('stroke-linecap', 'round')
      .style('stroke-width', this.lineWidth);

    // Line to show the remaining left value
    const emptyLineLeft = selection.append('line')
      .attr('x1', this.sliderSideMargin)
      .attr('x2', this.sliderSideMargin + (width * normValueLeft))
      .attr('y1', this.sliderTopMargin + 10)
      .attr('y2', this.sliderTopMargin + 10)
      .style('stroke', this.emptyColor)
      .style('stroke-linecap', 'round')
      .style('stroke-width', this.lineWidth);

    // Line to show the remaining right value
    const emptyLineRight = selection.append('line')
      .attr('x1', this.sliderSideMargin + (width * normValueRight))
      .attr('x2', this.sliderSideMargin + width)
      .attr('y1', this.sliderTopMargin + 10)
      .attr('y2', this.sliderTopMargin + 10)
      .style('stroke', this.emptyColor)
      .style('stroke-linecap', 'round')
      .style('stroke-width', this.lineWidth);

    let leftHandler;
    let rightHandler;
    leftHandler = selection.append('circle')
      .attr('cx', this.sliderSideMargin + (width * normValueLeft))
      .attr('cy', this.sliderTopMargin + 10)
      .attr('r', this.thumbSize)
      .style('stroke', this.thumbStroke)
      .style('stroke-width', this.thumbStrokeWidth)
      .style('fill', this.thumbColor);
    rightHandler = selection.append('circle')
      .attr('cx', this.sliderSideMargin + (width * normValueRight))
      .attr('cy', this.sliderTopMargin + 10)
      .attr('r', this.thumbSize)
      .style('stroke', this.thumbStroke)
      .style('stroke-width', this.thumbStrokeWidth)
      .style('fill', this.thumbColor);

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
      that.rangeChosen[0] = that.getDenormValue(iNewValue);
      that.rangeChosenChange.emit([that.rangeChosen[0], that.rangeChosen[1]]);
    }

    function eventRight(iNewValue) {
      that.rangeChosen[1] = that.getDenormValue(iNewValue);
      that.rangeChosenChange.emit([that.rangeChosen[0], that.rangeChosen[1]]);
    }

  }

}
