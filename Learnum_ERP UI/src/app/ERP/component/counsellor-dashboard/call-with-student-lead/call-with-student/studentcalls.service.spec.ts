import { TestBed } from '@angular/core/testing';

import { StudentcallsService } from './studentcalls.service';

describe('StudentcallsService', () => {
  let service: StudentcallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentcallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
