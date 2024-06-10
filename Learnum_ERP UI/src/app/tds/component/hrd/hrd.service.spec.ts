import { TestBed } from '@angular/core/testing';

import { HrdService } from './hrd.service';

describe('HrdService', () => {
  let service: HrdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HrdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
