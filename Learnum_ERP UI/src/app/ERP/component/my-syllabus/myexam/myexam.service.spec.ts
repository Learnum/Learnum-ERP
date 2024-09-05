import { TestBed } from '@angular/core/testing';

import { MyexamService } from './myexam.service';

describe('MyexamService', () => {
  let service: MyexamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyexamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
