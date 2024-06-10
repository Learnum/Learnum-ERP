import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLeadsComponent } from './student-leads.component';

describe('StudentLeadsComponent', () => {
  let component: StudentLeadsComponent;
  let fixture: ComponentFixture<StudentLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentLeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
