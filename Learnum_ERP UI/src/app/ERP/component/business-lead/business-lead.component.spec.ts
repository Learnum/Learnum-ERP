import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessLeadComponent } from './business-lead.component';

describe('BusinessLeadComponent', () => {
  let component: BusinessLeadComponent;
  let fixture: ComponentFixture<BusinessLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
