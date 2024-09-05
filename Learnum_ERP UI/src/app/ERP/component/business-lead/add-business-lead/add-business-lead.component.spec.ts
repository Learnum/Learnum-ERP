import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusinessLeadComponent } from './add-business-lead.component';

describe('AddBusinessLeadComponent', () => {
  let component: AddBusinessLeadComponent;
  let fixture: ComponentFixture<AddBusinessLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBusinessLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBusinessLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
