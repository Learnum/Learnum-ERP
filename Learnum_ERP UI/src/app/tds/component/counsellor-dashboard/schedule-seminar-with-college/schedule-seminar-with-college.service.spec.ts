import { TestBed } from '@angular/core/testing';

import { ScheduleSeminarWithCollegeService } from './schedule-seminar-with-college.service';

describe('ScheduleSeminarWithCollegeService', () => {
  let service: ScheduleSeminarWithCollegeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleSeminarWithCollegeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
