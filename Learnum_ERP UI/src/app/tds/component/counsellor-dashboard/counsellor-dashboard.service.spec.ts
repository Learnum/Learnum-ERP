import { TestBed } from '@angular/core/testing';

import { CounsellorDashboardService } from './counsellor-dashboard.service';

describe('CounsellorDashboardService', () => {
  let service: CounsellorDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounsellorDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
