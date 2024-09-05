import { TestBed } from '@angular/core/testing';

import { GeneralExamService } from './general-exam.service';

describe('GeneralExamService', () => {
  let service: GeneralExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
