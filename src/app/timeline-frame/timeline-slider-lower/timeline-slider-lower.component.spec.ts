import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineSliderLowerComponent } from './timeline-slider-lower.component';

describe('TimelineSliderLowerComponent', () => {
  let component: TimelineSliderLowerComponent;
  let fixture: ComponentFixture<TimelineSliderLowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineSliderLowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineSliderLowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
