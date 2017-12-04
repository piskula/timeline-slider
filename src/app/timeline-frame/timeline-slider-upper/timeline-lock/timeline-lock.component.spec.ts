import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineLockComponent } from './timeline-lock.component';

describe('TimelineLockComponent', () => {
  let component: TimelineLockComponent;
  let fixture: ComponentFixture<TimelineLockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineLockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineLockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
