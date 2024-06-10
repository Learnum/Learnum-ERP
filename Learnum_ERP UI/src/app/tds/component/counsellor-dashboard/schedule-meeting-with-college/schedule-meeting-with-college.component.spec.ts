import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleMeetingWithCollegeComponent } from './schedule-meeting-with-college.component';

describe('ScheduleMeetingWithCollegeComponent', () => {
  let component: ScheduleMeetingWithCollegeComponent;
  let fixture: ComponentFixture<ScheduleMeetingWithCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleMeetingWithCollegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleMeetingWithCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
