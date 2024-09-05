import { TestBed } from '@angular/core/testing';

import { CollegeseminarService } from './collegeseminar.service';

describe('CollegeseminarService', () => {
  let service: CollegeseminarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollegeseminarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
