import { TestBed } from '@angular/core/testing';

import { StudentAdmissionStatusService } from './student-admission-status.service';

describe('StudentAdmissionStatusService', () => {
  let service: StudentAdmissionStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentAdmissionStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
