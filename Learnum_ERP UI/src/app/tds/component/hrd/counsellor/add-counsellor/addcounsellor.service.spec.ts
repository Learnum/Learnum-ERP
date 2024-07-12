import { TestBed } from '@angular/core/testing';

import { AddcounsellorService } from './addcounsellor.service';

describe('AddcounsellorService', () => {
  let service: AddcounsellorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddcounsellorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
