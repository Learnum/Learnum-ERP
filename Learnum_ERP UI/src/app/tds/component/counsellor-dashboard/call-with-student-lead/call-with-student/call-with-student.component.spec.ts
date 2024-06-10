import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallWithStudentComponent } from './call-with-student.component';

describe('CallWithStudentComponent', () => {
  let component: CallWithStudentComponent;
  let fixture: ComponentFixture<CallWithStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallWithStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallWithStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
