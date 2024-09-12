import { TestBed } from '@angular/core/testing';

import { SendfeesreminderService } from './sendfeesreminder.service';

describe('SendfeesreminderService', () => {
  let service: SendfeesreminderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendfeesreminderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
