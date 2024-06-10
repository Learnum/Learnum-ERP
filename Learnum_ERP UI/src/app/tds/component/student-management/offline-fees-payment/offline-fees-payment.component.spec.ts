import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineFeesPaymentComponent } from './offline-fees-payment.component';

describe('OfflineFeesPaymentComponent', () => {
  let component: OfflineFeesPaymentComponent;
  let fixture: ComponentFixture<OfflineFeesPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfflineFeesPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineFeesPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
