import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleSeminarWithCollegeComponent } from './schedule-seminar-with-college.component';

describe('ScheduleSeminarWithCollegeComponent', () => {
  let component: ScheduleSeminarWithCollegeComponent;
  let fixture: ComponentFixture<ScheduleSeminarWithCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleSeminarWithCollegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleSeminarWithCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
