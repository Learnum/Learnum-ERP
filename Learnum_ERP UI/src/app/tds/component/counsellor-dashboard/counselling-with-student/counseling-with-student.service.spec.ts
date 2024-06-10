import { TestBed } from '@angular/core/testing';

import { CounselingWithStudentService } from './counseling-with-student.service';

describe('CounselingWithStudentService', () => {
  let service: CounselingWithStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounselingWithStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
