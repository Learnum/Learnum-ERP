import { TestBed } from '@angular/core/testing';

import { PracticalProblemAnswerSheetService } from './practical-problem-answer-sheet.service';

describe('PracticalProblemAnswerSheetService', () => {
  let service: PracticalProblemAnswerSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticalProblemAnswerSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
