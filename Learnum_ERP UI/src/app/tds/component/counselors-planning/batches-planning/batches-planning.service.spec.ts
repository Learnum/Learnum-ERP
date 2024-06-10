import { TestBed } from '@angular/core/testing';

import { BatchesPlanningService } from './batches-planning.service';

describe('BatchesPlanningService', () => {
  let service: BatchesPlanningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchesPlanningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
