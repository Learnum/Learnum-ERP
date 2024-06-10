import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPracticalProblemSolutionComponent } from './add-practical-problem-solution.component';

describe('AddPracticalProblemSolutionComponent', () => {
  let component: AddPracticalProblemSolutionComponent;
  let fixture: ComponentFixture<AddPracticalProblemSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPracticalProblemSolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPracticalProblemSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
