import { TestBed } from '@angular/core/testing';

import { PracticalProblemService } from './practical-problem.service';

describe('PracticalProblemService', () => {
  let service: PracticalProblemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticalProblemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
