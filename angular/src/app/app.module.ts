import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import 'rxjs/add/operator/finally'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/takeWhile'

import { D3SliderLowerDirective } from './slider-directive/slider-lower.directive';
import { D3SliderUpperDirective } from './slider-directive/slider-upper.directive';

import { PossibleTimestampsService } from './time-service/possible-timestamps.service';
import { ShareTimeService } from './time-service/share-time.service';

import { AppComponent } from './app.component';
import { TimelineConfigurationComponent } from './timeline-frame/timeline-configuration/timeline-configuration.component';
import { TimelineFrameComponent } from './timeline-frame/timeline-frame.component';
import { TimelineScaleComponent } from './timeline-frame/timeline-scale/timeline-scale.component';
import { TimelineSliderLowerComponent } from './timeline-frame/timeline-slider-lower/timeline-slider-lower.component';
import { TimelineSliderUpperComponent } from './timeline-frame/timeline-slider-upper/timeline-slider-upper.component';
import { TimelineSidebarComponent } from './timeline-frame/timeline-sidebar/timeline-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    TimelineConfigurationComponent,
    TimelineFrameComponent,
    TimelineScaleComponent,
    TimelineSliderLowerComponent,
    TimelineSliderUpperComponent,
    D3SliderLowerDirective,
    D3SliderUpperDirective,
    TimelineSidebarComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ShareTimeService, PossibleTimestampsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
