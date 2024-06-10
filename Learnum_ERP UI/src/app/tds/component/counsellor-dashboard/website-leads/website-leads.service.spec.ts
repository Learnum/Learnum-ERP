import { TestBed } from '@angular/core/testing';

import { WebsiteLeadsService } from './website-leads.service';

describe('WebsiteLeadsService', () => {
  let service: WebsiteLeadsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsiteLeadsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
