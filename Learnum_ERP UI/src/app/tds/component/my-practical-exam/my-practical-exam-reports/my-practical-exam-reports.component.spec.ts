import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPracticalExamReportsComponent } from './my-practical-exam-reports.component';

describe('MyPracticalExamReportsComponent', () => {
  let component: MyPracticalExamReportsComponent;
  let fixture: ComponentFixture<MyPracticalExamReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPracticalExamReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPracticalExamReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
