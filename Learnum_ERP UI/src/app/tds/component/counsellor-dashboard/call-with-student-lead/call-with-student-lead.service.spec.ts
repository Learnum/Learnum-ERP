import { TestBed } from '@angular/core/testing';

import { CallWithStudentLeadService } from './call-with-student-lead.service';

describe('CallWithStudentLeadService', () => {
  let service: CallWithStudentLeadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallWithStudentLeadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
