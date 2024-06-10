import { TestBed } from '@angular/core/testing';

import { AddClassroomsService } from './add-classrooms.service';

describe('AddClassroomsService', () => {
  let service: AddClassroomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddClassroomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
