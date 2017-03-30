import { Component } from '@angular/core';
import {log} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Slider Module';

  boxes: number = 10;

  addBox(): void {
    this.boxes++;
    console.log('New Box added, now:' + this.boxes);
  }
}
