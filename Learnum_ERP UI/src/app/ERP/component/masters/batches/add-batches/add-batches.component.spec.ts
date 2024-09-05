import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBatchesComponent } from './add-batches.component';

describe('AddBatchesComponent', () => {
  let component: AddBatchesComponent;
  let fixture: ComponentFixture<AddBatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
