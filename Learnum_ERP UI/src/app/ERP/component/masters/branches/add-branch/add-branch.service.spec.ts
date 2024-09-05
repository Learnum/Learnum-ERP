import { TestBed } from '@angular/core/testing';

import { AddBranchService } from './add-branch.service';

describe('AddBranchService', () => {
  let service: AddBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
