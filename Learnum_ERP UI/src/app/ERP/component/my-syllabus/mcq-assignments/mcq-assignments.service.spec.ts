import { TestBed } from '@angular/core/testing';

import { McqAssignmentsService } from './mcq-assignments.service';

describe('McqAssignmentsService', () => {
  let service: McqAssignmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(McqAssignmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
