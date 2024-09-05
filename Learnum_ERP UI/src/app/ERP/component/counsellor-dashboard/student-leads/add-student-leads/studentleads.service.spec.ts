import { TestBed } from '@angular/core/testing';

import { StudentleadsService } from './studentleads.service';

describe('StudentleadsService', () => {
  let service: StudentleadsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentleadsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
