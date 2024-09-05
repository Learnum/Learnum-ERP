import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendFeesReminderReportComponent } from './send-fees-reminder-report.component';

describe('SendFeesReminderReportComponent', () => {
  let component: SendFeesReminderReportComponent;
  let fixture: ComponentFixture<SendFeesReminderReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendFeesReminderReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendFeesReminderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
