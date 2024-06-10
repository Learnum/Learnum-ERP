import { TestBed } from '@angular/core/testing';

import { PracticalProblemsStudentsService } from './practical-problems-students.service';

describe('PracticalProblemsStudentsService', () => {
  let service: PracticalProblemsStudentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticalProblemsStudentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
