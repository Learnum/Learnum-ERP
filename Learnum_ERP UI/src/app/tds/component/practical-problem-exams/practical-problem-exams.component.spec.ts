import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticalProblemExamsComponent } from './practical-problem-exams.component';

describe('PracticalProblemExamsComponent', () => {
  let component: PracticalProblemExamsComponent;
  let fixture: ComponentFixture<PracticalProblemExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticalProblemExamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticalProblemExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
