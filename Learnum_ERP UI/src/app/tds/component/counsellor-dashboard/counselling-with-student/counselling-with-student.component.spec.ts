import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellingWithStudentComponent } from './counselling-with-student.component';

describe('CounsellingWithStudentComponent', () => {
  let component: CounsellingWithStudentComponent;
  let fixture: ComponentFixture<CounsellingWithStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellingWithStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellingWithStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
