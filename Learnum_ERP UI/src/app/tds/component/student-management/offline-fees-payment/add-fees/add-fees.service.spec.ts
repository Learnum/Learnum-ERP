import { TestBed } from '@angular/core/testing';

import { AddFeesService } from './add-fees.service';

describe('AddFeesService', () => {
  let service: AddFeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddFeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
