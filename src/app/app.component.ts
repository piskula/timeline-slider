import { Component } from '@angular/core';
import {log} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Slider Module';

  min = 1455195000;
  max = 1455195060;
  step = 20;
  rangeDown = this.min;
  rangeUp = this.max;

  addBox(): void {
    this.max += this.step;
  }

  addBadBox(): void {
    this.max += 1200;
  }

  handleRange(range) {
    this.rangeDown = range[0];
    this.rangeUp = range[1];
  }

}
