import { TestBed } from '@angular/core/testing';

import { StudentLeadsService } from './student-leads.service';

describe('StudentLeadsService', () => {
  let service: StudentLeadsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentLeadsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
