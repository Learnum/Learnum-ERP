import { TestBed } from '@angular/core/testing';

import { PracticalProblemExamsService } from './practical-problem-exams.service';

describe('PracticalProblemExamsService', () => {
  let service: PracticalProblemExamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticalProblemExamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
