import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineFrameComponent } from './timeline-frame.component';

describe('TimelineFrameComponent', () => {
  let component: TimelineFrameComponent;
  let fixture: ComponentFixture<TimelineFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
