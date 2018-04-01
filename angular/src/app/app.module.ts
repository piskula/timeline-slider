import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/finally'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/takeWhile'

import { D3SliderLowerDirective } from './slider-directive/slider-lower.directive';
import { D3SliderUpperDirective } from './slider-directive/slider-upper.directive';

import { AppComponent } from './app.component';
import { PossibleTimestampsService } from './time-service/possible-timestamps.service';
import { ShareTimeService } from './time-service/share-time.service';
import { TimelineSliderLowerComponent } from './timeline-frame/timeline-slider-lower/timeline-slider-lower.component';
import { TimelineScaleComponent } from './timeline-frame/timeline-scale/timeline-scale.component';
import { TimelineFrameComponent } from './timeline-frame/timeline-frame.component';
import { TimelineSliderUpperComponent } from './timeline-frame/timeline-slider-upper/timeline-slider-upper.component';

@NgModule({
  declarations: [
    AppComponent,
    TimelineSliderLowerComponent,
    TimelineScaleComponent,
    TimelineFrameComponent,
    TimelineSliderUpperComponent,
    D3SliderLowerDirective,
    D3SliderUpperDirective,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [ShareTimeService, PossibleTimestampsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
