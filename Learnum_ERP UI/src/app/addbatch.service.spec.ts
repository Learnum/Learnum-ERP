import { TestBed } from '@angular/core/testing';

import { AddbatchService } from './addbatch.service';

describe('AddbatchService', () => {
  let service: AddbatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddbatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
