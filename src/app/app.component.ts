import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {TimelineFrameComponent} from './timeline-frame/timeline-frame.component';
import {ShareTimeService} from "./time-service/share-time.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public rangeChosen: Observable<Number[]>;

  constructor(private _timeService: ShareTimeService) {
  }

  ngOnInit(): void {
    this.rangeChosen = this._timeService.getRangeChosen();

    this._timeService.setMin(1455195000);
    this._timeService.setMax(1455202200);
    this._timeService.setRangeChosen([1455195000, 1455202200]);
    this._timeService.setLocked(false);
  }

  addBox(): void {
    this._timeService.setMax(this._timeService.getLastMax().valueOf() + (20 * 3 * 60));
  }

}
