import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePracticalProblemComponent } from './schedule-practical-problem.component';

describe('SchedulePracticalProblemComponent', () => {
  let component: SchedulePracticalProblemComponent;
  let fixture: ComponentFixture<SchedulePracticalProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulePracticalProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulePracticalProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
