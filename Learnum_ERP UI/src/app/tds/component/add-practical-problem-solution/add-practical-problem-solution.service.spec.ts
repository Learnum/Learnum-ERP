import { TestBed } from '@angular/core/testing';

import { AddPracticalProblemSolutionService } from './add-practical-problem-solution.service';

describe('AddPracticalProblemSolutionService', () => {
  let service: AddPracticalProblemSolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPracticalProblemSolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
