import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TimelineSliderComponent } from './timeline-frame/timeline-slider/timeline-slider.component';
import { NouisliderModule } from 'ng2-nouislider/src/nouislider';
import { TimelineScaleComponent } from './timeline-frame/timeline-scale/timeline-scale.component';
import { TimelineFrameComponent } from './timeline-frame/timeline-frame.component';
import { TimeLabelComponent } from './timeline-frame/time-label/time-label.component';

@NgModule({
  declarations: [
    AppComponent,
    TimelineSliderComponent,
    TimelineScaleComponent,
    TimelineFrameComponent,
    TimeLabelComponent
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
