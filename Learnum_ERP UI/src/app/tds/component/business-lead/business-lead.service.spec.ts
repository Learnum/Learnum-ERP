import { TestBed } from '@angular/core/testing';

import { BusinessLeadService } from './business-lead.service';

describe('BusinessLeadService', () => {
  let service: BusinessLeadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessLeadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
