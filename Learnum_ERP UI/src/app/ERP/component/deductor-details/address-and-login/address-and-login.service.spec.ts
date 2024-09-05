import { TestBed } from '@angular/core/testing';

import { AddressAndLoginService } from './address-and-login.service';

describe('AddressAndLoginService', () => {
  let service: AddressAndLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressAndLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
