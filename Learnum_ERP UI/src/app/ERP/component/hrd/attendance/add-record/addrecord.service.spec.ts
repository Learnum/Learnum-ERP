import { TestBed } from '@angular/core/testing';

import { AddrecordService } from './addrecord.service';

describe('AddrecordService', () => {
  let service: AddrecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddrecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
