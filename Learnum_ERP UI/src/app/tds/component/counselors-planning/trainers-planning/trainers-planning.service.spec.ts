import { TestBed } from '@angular/core/testing';

import { TrainersPlanningService } from './trainers-planning.service';

describe('TrainersPlanningService', () => {
  let service: TrainersPlanningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainersPlanningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
