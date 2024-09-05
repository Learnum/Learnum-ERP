import { TestBed } from '@angular/core/testing';

import { BirthdayDetailsService } from './birthday-details.service';

describe('BirthdayDetailsService', () => {
  let service: BirthdayDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BirthdayDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
