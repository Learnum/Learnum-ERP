import { TestBed } from '@angular/core/testing';

import { ScheduleMeetingWithCollegeService } from './schedule-meeting-with-college.service';

describe('ScheduleMeetingWithCollegeService', () => {
  let service: ScheduleMeetingWithCollegeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleMeetingWithCollegeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
