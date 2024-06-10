import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallWithStudentLeadComponent } from './call-with-student-lead.component';

describe('CallWithStudentLeadComponent', () => {
  let component: CallWithStudentLeadComponent;
  let fixture: ComponentFixture<CallWithStudentLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallWithStudentLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallWithStudentLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
