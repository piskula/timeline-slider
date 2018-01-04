import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { D3SliderLowerDirective } from './slider-directive/slider-lower.directive';
import { D3SliderUpperDirective } from './slider-directive/slider-upper.directive';

import { AppComponent } from './app.component';
import { ShareTimeService } from './time-service/share-time.service';
import { TimelineSliderLowerComponent } from './timeline-frame/timeline-slider-lower/timeline-slider-lower.component';
import { TimelineScaleComponent } from './timeline-frame/timeline-scale/timeline-scale.component';
import { TimelineFrameComponent } from './timeline-frame/timeline-frame.component';
import { TimeLabelComponent } from './timeline-frame/time-label/time-label.component';
import { TimelineSliderUpperComponent } from './timeline-frame/timeline-slider-upper/timeline-slider-upper.component';
import { TimelineLockComponent } from './timeline-frame/timeline-slider-upper/timeline-lock/timeline-lock.component';

@NgModule({
  declarations: [
    AppComponent,
    TimelineSliderLowerComponent,
    TimelineScaleComponent,
    TimelineFrameComponent,
    TimeLabelComponent,
    TimelineSliderUpperComponent,
    TimelineLockComponent,
    D3SliderLowerDirective,
    D3SliderUpperDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [ShareTimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
