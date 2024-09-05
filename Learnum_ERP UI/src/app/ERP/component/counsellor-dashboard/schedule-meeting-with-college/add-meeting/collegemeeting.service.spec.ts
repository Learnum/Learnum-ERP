import { TestBed } from '@angular/core/testing';

import { CollegemeetingService } from './collegemeeting.service';

describe('CollegemeetingService', () => {
  let service: CollegemeetingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollegemeetingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
