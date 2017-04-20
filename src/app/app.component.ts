import { Component } from '@angular/core';
import {log} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Slider Module';

  min = 5;
  max = 9;
  step = 2;

  addBox(): void {
    this.max += this.step;
  }

  addBadBox(): void {
    this.max += 1;
  }
}
