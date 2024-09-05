import { TestBed } from '@angular/core/testing';

import { AddcontentWriterService } from './addcontent-writer.service';

describe('AddcontentWriterService', () => {
  let service: AddcontentWriterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddcontentWriterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
