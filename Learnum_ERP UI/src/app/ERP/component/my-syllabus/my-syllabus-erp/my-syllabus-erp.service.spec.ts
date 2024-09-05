import { TestBed } from '@angular/core/testing';

import { MySyllabusErpService } from './my-syllabus-erp.service';

describe('MySyllabusErpService', () => {
  let service: MySyllabusErpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MySyllabusErpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
