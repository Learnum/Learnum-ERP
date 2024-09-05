import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchesPlanningComponent } from './batches-planning.component';

describe('BatchesPlanningComponent', () => {
  let component: BatchesPlanningComponent;
  let fixture: ComponentFixture<BatchesPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchesPlanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchesPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
