import { TestBed } from '@angular/core/testing';

import { SyllabuscompletionService } from './syllabuscompletion.service';

describe('SyllabuscompletionService', () => {
  let service: SyllabuscompletionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyllabuscompletionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
