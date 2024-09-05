import { TestBed } from '@angular/core/testing';

import { ContentWriterService } from './content-writer.service';

describe('ContentWriterService', () => {
  let service: ContentWriterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentWriterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
