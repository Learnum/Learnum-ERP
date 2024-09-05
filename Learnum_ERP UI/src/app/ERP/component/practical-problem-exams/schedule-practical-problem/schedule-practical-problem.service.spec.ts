import { TestBed } from '@angular/core/testing';

import { SchedulePracticalProblemService } from './schedule-practical-problem.service';

describe('SchedulePracticalProblemService', () => {
  let service: SchedulePracticalProblemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulePracticalProblemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
