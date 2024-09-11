import { TestBed } from '@angular/core/testing';

import { AddsyllabusService } from './addsyllabus.service';

describe('AddsyllabusService', () => {
  let service: AddsyllabusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddsyllabusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
