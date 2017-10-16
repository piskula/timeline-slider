import {Component, ViewChild} from '@angular/core';
import {TimelineFrameComponent} from './timeline-frame/timeline-frame.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Slider Module';

  range = [1455195000, 1455202200];
  step = 20;

  @ViewChild(TimelineFrameComponent) frame: TimelineFrameComponent;

  addBox(): void {
    this.range = [this.range[0], this.range[1] + this.step * 3];
  }

  addBigBox(): void {
    this.range = [this.range[0], this.range[1] + this.step * 3 * 60];
  }

}
