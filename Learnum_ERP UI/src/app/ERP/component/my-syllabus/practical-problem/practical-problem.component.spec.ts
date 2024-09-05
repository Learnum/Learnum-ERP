import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticalProblemComponent } from './practical-problem.component';

describe('PracticalProblemComponent', () => {
  let component: PracticalProblemComponent;
  let fixture: ComponentFixture<PracticalProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticalProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticalProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
