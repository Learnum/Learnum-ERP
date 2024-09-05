import { TestBed } from '@angular/core/testing';

import { SendFeesReminderReportService } from './send-fees-reminder-report.service';

describe('SendFeesReminderReportService', () => {
  let service: SendFeesReminderReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendFeesReminderReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
