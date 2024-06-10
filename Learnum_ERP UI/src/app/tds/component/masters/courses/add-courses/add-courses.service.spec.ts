import { TestBed } from '@angular/core/testing';

import { AddCoursesService } from './add-courses.service';

describe('AddCoursesService', () => {
  let service: AddCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
