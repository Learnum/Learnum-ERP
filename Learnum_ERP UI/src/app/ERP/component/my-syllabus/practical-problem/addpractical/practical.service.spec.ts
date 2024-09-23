import { TestBed } from '@angular/core/testing';

import { PracticalService } from './practical.service';

describe('PracticalService', () => {
  let service: PracticalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
