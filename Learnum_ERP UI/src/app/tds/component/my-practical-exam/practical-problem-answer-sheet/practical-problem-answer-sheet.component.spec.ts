import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticalProblemAnswerSheetComponent } from './practical-problem-answer-sheet.component';

describe('PracticalProblemAnswerSheetComponent', () => {
  let component: PracticalProblemAnswerSheetComponent;
  let fixture: ComponentFixture<PracticalProblemAnswerSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticalProblemAnswerSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticalProblemAnswerSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
