import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-timeline-sidebar',
  templateUrl: './timeline-sidebar.component.html',
  styleUrls: ['./timeline-sidebar.component.scss']
})
export class TimelineSidebarComponent {

  @Input() isRefreshButtonActive: Boolean;
  @Input() isPeriodicTaskInProgress: Boolean;
  @Input() isInitialized: Boolean;
  @Input() errorTooltip: String;
  @Output() onRefresh = new EventEmitter();

  constructor() { }

}
