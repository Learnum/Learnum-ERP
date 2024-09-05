import { TestBed } from '@angular/core/testing';

import { AddBusinessLeadService } from './add-business-lead.service';

describe('AddBusinessLeadService', () => {
  let service: AddBusinessLeadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddBusinessLeadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
