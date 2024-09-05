import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainersPlanningComponent } from './trainers-planning.component';

describe('TrainersPlanningComponent', () => {
  let component: TrainersPlanningComponent;
  let fixture: ComponentFixture<TrainersPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainersPlanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainersPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
