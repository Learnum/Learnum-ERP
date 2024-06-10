import { TestBed } from '@angular/core/testing';

import { AddbranchService } from './addbranch.service';

describe('AddbranchService', () => {
  let service: AddbranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddbranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
