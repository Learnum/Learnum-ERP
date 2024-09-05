import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticalProblemsStudentsComponent } from './practical-problems-students.component';

describe('PracticalProblemsStudentsComponent', () => {
  let component: PracticalProblemsStudentsComponent;
  let fixture: ComponentFixture<PracticalProblemsStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticalProblemsStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticalProblemsStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
