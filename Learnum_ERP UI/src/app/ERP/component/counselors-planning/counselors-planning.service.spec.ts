import { TestBed } from '@angular/core/testing';

import { CounselorsPlanningService } from './counselors-planning.service';

describe('CounselorsPlanningService', () => {
  let service: CounselorsPlanningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounselorsPlanningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
