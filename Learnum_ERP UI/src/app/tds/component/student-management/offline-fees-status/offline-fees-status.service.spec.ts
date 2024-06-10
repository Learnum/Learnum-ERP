import { TestBed } from '@angular/core/testing';

import { OfflineFeesStatusService } from './offline-fees-status.service';

describe('OfflineFeesStatusService', () => {
  let service: OfflineFeesStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfflineFeesStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
