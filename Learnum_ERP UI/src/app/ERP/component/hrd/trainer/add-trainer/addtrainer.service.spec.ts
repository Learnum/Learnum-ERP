import { TestBed } from '@angular/core/testing';

import { AddtrainerService } from './addtrainer.service';

describe('AddtrainerService', () => {
  let service: AddtrainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddtrainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
