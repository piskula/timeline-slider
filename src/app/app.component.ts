import { Component } from '@angular/core';
import {log} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Slider Module';

  min = 7200;
  max = 18000;
  step = 3600;
  public outputRange: number[];

  addBox(): void {
    this.max += this.step;
  }

  addBadBox(): void {
    this.max += 1200;
  }

  handleRange(range) {
    console.log('range come');
    this.outputRange = range;
  }

}
