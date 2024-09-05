import { TestBed } from '@angular/core/testing';

import { StudentcounsellingService } from './studentcounselling.service';

describe('StudentcounsellingService', () => {
  let service: StudentcounsellingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentcounsellingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
