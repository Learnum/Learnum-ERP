import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentLeadsComponent } from './add-student-leads.component';

describe('AddStudentLeadsComponent', () => {
  let component: AddStudentLeadsComponent;
  let fixture: ComponentFixture<AddStudentLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentLeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
