import {Directive, EventEmitter, Input, Output} from '@angular/core';
import * as d3 from 'd3';

import {
  COLOR_THUMB,
  DARK_GREY,
  D3SliderBaseDirective, OPACITY_MIDDLE, COLOR_UPPER, COLOR_LOWER
} from './slider-base.directive';

export const LINE_WIDTH = '.625rem';
export const LINE_EMPTY_WIDTH = '.5rem';
export const THUMB_STROKE_WIDTH = '.0625rem';

@Directive({
  selector: '[appD3SliderUpper]'
})
export class D3SliderUpperDirective extends D3SliderBaseDirective {

  @Input() isRightLocked: Boolean;
  @Input() isLeftLocked: Boolean;
  @Output() rightLockChange = new EventEmitter();
  @Output() leftLockChange = new EventEmitter();

  constructor () {
    super();
    this.id = 'sliderUpper';

    this.isLeftLocked = false;
    this.isRightLocked = false;
  }

  // Override
  createSlider(selection) {
    const that = this;

    const width = this.getWidth();
    const fontSize = this.getFontSize();
    const sliderSideMargin = this.getSideMargin();
    const sliderTopMargin = fontSize * 2.25;
    const thumbSize = fontSize * 0.5;
    const thumbSizeClick = fontSize * 0.625;
    const leftLockAddition = fontSize * 0.325;
    const rightLockAddition = fontSize * 2.125;

    let normValueLeft = this.getNormValue(this.rangeChosen[0]); // value normalized between 0-1
    let normValueRight = this.getNormValue(this.rangeChosen[1]); // value normalized between 0-1
    let denormValueDrag;

    let selectedValueLeft;
    let selectedValueRight;

    function dragStartLeft() {
      leftHandler.attr('r', thumbSizeClick);
    }

    function dragStartRight() {
      rightHandler.attr('r', thumbSizeClick);
    }

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
      leftHandler.attr('cx', sliderSideMargin + selectedValueLeft);
      leftLockWrapper.attr('x', selectedValueLeft + leftLockAddition);
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
      rightHandler.attr('cx', sliderSideMargin + selectedValueRight);
      rightLockWrapper
        .attr('x', selectedValueRight + rightLockAddition)
        .style('display', normValueRight === 1 ? 'inherit' : 'none');
      valueLine.attr('x2', sliderSideMargin + selectedValueRight);
      emptyLineRight
        .attr('x1', sliderSideMargin + selectedValueRight)
        .attr('x2', sliderSideMargin + width);

      d3.event.sourceEvent.stopPropagation();
    }

    function drag() {
      const _normValue = (d3.event['x'] - sliderSideMargin) / width;
      const _denormValue = that.getDenormValue(_normValue);
      if (!denormValueDrag) {
        denormValueDrag = _denormValue;
      }

      const denormDiff = _denormValue - denormValueDrag;
      let denormLeft = that.rangeChosen[0] + denormDiff;
      let denormRight = that.rangeChosen[1] + denormDiff;

      if (denormRight > that.maxValue) {
        denormLeft = that.rangeChosen[0] + (that.maxValue - that.rangeChosen[1]);
        denormRight = that.maxValue;
      } else if (denormLeft < that.minValue) {
        denormLeft = that.minValue;
        denormRight = that.rangeChosen[1] - (that.rangeChosen[0] - that.minValue);
      }

      // if drag is too small to change value, do not emit the same multiple times
      if (denormLeft === that.getDenormValue(normValueLeft)) {
        return;
      }

      // update value
      normValueRight = that.getNormValue(denormRight);
      selectedValueRight = that.getNormValue(denormRight) * width;
      normValueLeft = that.getNormValue(denormLeft);
      selectedValueLeft = normValueLeft * width;

      leftHandler.attr('cx', sliderSideMargin + selectedValueLeft);
      leftLockWrapper
        .attr('x', selectedValueLeft + leftLockAddition)
        .style('display', normValueRight === 1 && that.isRightLocked ? 'inherit' : 'none');
      rightHandler.attr('cx', sliderSideMargin + selectedValueRight);
      rightLockWrapper
        .attr('x', selectedValueRight + rightLockAddition)
        .style('display', normValueRight === 1 ? 'inherit' : 'none');

      emptyLineLeft
        .attr('x1', sliderSideMargin)
        .attr('x2', sliderSideMargin + selectedValueLeft);
      valueLine
        .attr('x1', sliderSideMargin + selectedValueLeft)
        .attr('x2', sliderSideMargin + selectedValueRight);
      emptyLineRight
        .attr('x1', sliderSideMargin + selectedValueRight)
        .attr('x2', sliderSideMargin + width);

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

    function dragEnd() {
      denormValueDrag = null;
      if (eventDrag) {
        eventDrag(normValueLeft, normValueRight);
      }
    }


    // Line to represent the current value
    const valueLine = selection.append('line')
      .attr('x1', sliderSideMargin + (width * normValueLeft))
      .attr('x2', sliderSideMargin + (width * normValueRight))
      .attr('y1', sliderTopMargin)
      .attr('y2', sliderTopMargin)
      .style('stroke', COLOR_UPPER)
      .style('stroke-linecap', 'round')
      .style('stroke-width', LINE_WIDTH);

    // Line to show the remaining left value
    const emptyLineLeft = selection.append('line')
      .attr('x1', sliderSideMargin)
      .attr('x2', sliderSideMargin + (width * normValueLeft))
      .attr('y1', sliderTopMargin)
      .attr('y2', sliderTopMargin)
      .style('stroke', DARK_GREY)
      .style('opacity', OPACITY_MIDDLE)
      .style('stroke-linecap', 'round')
      .style('stroke-width', LINE_EMPTY_WIDTH);

    // Line to show the remaining right value
    const emptyLineRight = selection.append('line')
      .attr('x1', sliderSideMargin + (width * normValueRight))
      .attr('x2', sliderSideMargin + width)
      .attr('y1', sliderTopMargin)
      .attr('y2', sliderTopMargin)
      .style('stroke', DARK_GREY)
      .style('opacity', OPACITY_MIDDLE)
      .style('stroke-linecap', 'round')
      .style('stroke-width', LINE_EMPTY_WIDTH);

    const leftHandler = selection.append('circle')
      .attr('cx', sliderSideMargin + (width * normValueLeft))
      .attr('cy', sliderTopMargin)
      .attr('r', thumbSize)
      .style('stroke', DARK_GREY)
      .style('stroke-width', THUMB_STROKE_WIDTH)
      .style('fill', COLOR_THUMB);
    const rightHandler = selection.append('circle')
      .attr('cx', sliderSideMargin + (width * normValueRight))
      .attr('cy', sliderTopMargin)
      .attr('r', thumbSize)
      .style('stroke', DARK_GREY)
      .style('stroke-width', THUMB_STROKE_WIDTH)
      .style('fill', COLOR_THUMB);

    const leftLockWrapper = selection
      .append('svg:foreignObject')
      .attr('x', (width * normValueLeft) + leftLockAddition)
      .attr('y', -10)
      .style('font-size', '2rem')
      .style('cursor', 'pointer')
      .style('display', that.isRightLocked ? 'inherit' : 'none');
    const leftLock = leftLockWrapper
      .append('xhtml:body')
      .html(this.isLeftLocked ? '<i class="fa fa-lock"></i>' : '<i class="fa fa-unlock"></i>')
      .style('color', COLOR_LOWER)
      .on('click', function () {
        that.leftLockChange.emit(!that.isLeftLocked);
      });
    if (!this.isLeftLocked) {
      leftLock.style('opacity', OPACITY_MIDDLE)
        .style('color', DARK_GREY);
    }

    const rightLockWrapper = selection
      .append('svg:foreignObject')
      .attr('x', (width * normValueRight) + rightLockAddition)
      .attr('y', -10)
      .style('font-size', '2rem')
      .style('cursor', 'pointer')
      .style('display', normValueRight === 1 ? 'inherit' : 'none');
    const rightLock = rightLockWrapper
      .append('xhtml:body')
      .html(this.isRightLocked ? '<i class="fa fa-lock"></i>' : '<i class="fa fa-unlock"></i>')
      .style('color', COLOR_LOWER)
      .on('click', function () {
        that.rightLockChange.emit(!that.isRightLocked);
      });
    if (!this.isRightLocked) {
      rightLock.style('opacity', OPACITY_MIDDLE)
        .style('color', DARK_GREY);
    }

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

    function eventDrag(iNewValueLeft, iNewValueRight) {
      that.rangeChosen[0] = that.getDenormValue(iNewValueLeft);
      that.rangeChosen[1] = that.getDenormValue(iNewValueRight);
      that.rangeChosenChange.emit([that.rangeChosen[0], that.rangeChosen[1]]);
    }
  }

}
