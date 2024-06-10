import { TestBed } from '@angular/core/testing';

import { MyPracticalExamService } from './my-practical-exam.service';

describe('MyPracticalExamService', () => {
  let service: MyPracticalExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyPracticalExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
