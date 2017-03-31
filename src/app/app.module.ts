import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TimelineSliderComponent } from './timeline-slider/timeline-slider.component';
import { NouisliderModule } from 'ng2-nouislider';
import { TimelineScaleComponent } from './timeline-scale/timeline-scale.component';

@NgModule({
  declarations: [
    AppComponent,
    TimelineSliderComponent,
    TimelineScaleComponent
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
