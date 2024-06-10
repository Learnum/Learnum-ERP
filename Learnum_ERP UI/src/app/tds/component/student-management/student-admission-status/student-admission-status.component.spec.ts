import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdmissionStatusComponent } from './student-admission-status.component';

describe('StudentAdmissionStatusComponent', () => {
  let component: StudentAdmissionStatusComponent;
  let fixture: ComponentFixture<StudentAdmissionStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAdmissionStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAdmissionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
