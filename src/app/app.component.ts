import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Slider Module';

  range = [1455195000, 1455195600];
  step = 20;

  addBox(): void {
    this.range[1] += this.step * 3;
  }

  addBigBox(): void {
    this.range[1] += this.step * 3 * 60;
  }

}
