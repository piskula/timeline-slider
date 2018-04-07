import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TimelineConfiguration} from '../model/configuration';

@Component({
  selector: 'app-timeline-configuration',
  templateUrl: './timeline-configuration.component.html',
  styleUrls: ['./timeline-configuration.component.scss']
})
export class TimelineConfigurationComponent implements OnInit {

  public form: FormGroup;
  @Input() errorMsg: String;
  @Output() config = new EventEmitter<TimelineConfiguration>();

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.form = this._fb.group({
      'url': ['', Validators.required],
      'period': [0, [
        Validators.required,
        Validators.min(0),
        Validators.pattern('\\d+')]
      ],
    });
  }

  public onSubmit() {
    this.config.emit({
      url: this.form.value.url,
      period: parseInt(this.form.value.period, 10),
    });
  }

}
