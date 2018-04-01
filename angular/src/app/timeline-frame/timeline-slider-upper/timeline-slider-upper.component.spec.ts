import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineSliderUpperComponent } from './timeline-slider-upper.component';

describe('TimelineSliderUpperComponent', () => {
  let component: TimelineSliderUpperComponent;
  let fixture: ComponentFixture<TimelineSliderUpperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineSliderUpperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineSliderUpperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
