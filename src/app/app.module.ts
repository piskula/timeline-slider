import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { D3SliderDirective } from './slider-directive/slider.directive';
// import { D3SliderDirective } from 'ng-d3-slider/d3-slider.directive';

import { AppComponent } from './app.component';
import { TimelineSliderLowerComponent } from './timeline-frame/timeline-slider-lower/timeline-slider-lower.component';
import { NouisliderModule } from 'ng2-nouislider/src/nouislider';
import { TimelineScaleComponent } from './timeline-frame/timeline-scale/timeline-scale.component';
import { TimelineFrameComponent } from './timeline-frame/timeline-frame.component';
import { TimeLabelComponent } from './timeline-frame/time-label/time-label.component';
import { TimelineSliderUpperComponent } from './timeline-frame/timeline-slider-upper/timeline-slider-upper.component';
import { TimelineLockComponent } from './timeline-frame/timeline-lock/timeline-lock.component';

@NgModule({
  declarations: [
    AppComponent,
    TimelineSliderLowerComponent,
    TimelineScaleComponent,
    TimelineFrameComponent,
    TimeLabelComponent,
    TimelineSliderUpperComponent,
    TimelineLockComponent,
    D3SliderDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NouisliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
