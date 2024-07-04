import { TestBed } from '@angular/core/testing';

import { AddaccountantService } from './addaccountant.service';

describe('AddaccountantService', () => {
  let service: AddaccountantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddaccountantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
