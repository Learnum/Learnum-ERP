import { TestBed } from '@angular/core/testing';

import { WebsiteleadsService } from './websiteleads.service';

describe('WebsiteleadsService', () => {
  let service: WebsiteleadsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsiteleadsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
