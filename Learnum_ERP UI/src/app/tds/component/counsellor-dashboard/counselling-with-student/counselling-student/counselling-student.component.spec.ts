import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellingStudentComponent } from './counselling-student.component';

describe('CounsellingStudentComponent', () => {
  let component: CounsellingStudentComponent;
  let fixture: ComponentFixture<CounsellingStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellingStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellingStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
