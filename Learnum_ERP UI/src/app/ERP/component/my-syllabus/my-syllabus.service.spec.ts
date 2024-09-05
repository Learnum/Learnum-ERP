import { TestBed } from '@angular/core/testing';

import { MySyllabusService } from './my-syllabus.service';

describe('MySyllabusService', () => {
  let service: MySyllabusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MySyllabusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
