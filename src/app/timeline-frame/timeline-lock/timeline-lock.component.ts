import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-timeline-lock',
  templateUrl: './timeline-lock.component.html',
  styleUrls: ['./timeline-lock.component.css']
})
export class TimelineLockComponent implements OnInit {

  @Input() isLocked: boolean[];
  @Output() isLockedChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange() {
    this.isLockedChange.emit(!this.isLocked);
  }

}
