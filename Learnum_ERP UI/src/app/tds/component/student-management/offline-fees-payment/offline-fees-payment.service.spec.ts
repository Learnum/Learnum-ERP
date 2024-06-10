import { TestBed } from '@angular/core/testing';

import { OfflineFeesPaymentService } from './offline-fees-payment.service';

describe('OfflineFeesPaymentService', () => {
  let service: OfflineFeesPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfflineFeesPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
