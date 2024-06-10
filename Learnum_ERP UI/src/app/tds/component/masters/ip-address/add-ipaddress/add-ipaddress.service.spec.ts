import { TestBed } from '@angular/core/testing';

import { AddIpaddressService } from './add-ipaddress.service';

describe('AddIpaddressService', () => {
  let service: AddIpaddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddIpaddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
