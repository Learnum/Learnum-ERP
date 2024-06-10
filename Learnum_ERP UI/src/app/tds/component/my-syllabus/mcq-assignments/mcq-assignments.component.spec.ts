import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McqAssignmentsComponent } from './mcq-assignments.component';

describe('McqAssignmentsComponent', () => {
  let component: McqAssignmentsComponent;
  let fixture: ComponentFixture<McqAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McqAssignmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(McqAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
