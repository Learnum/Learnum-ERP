import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPracticalExamComponent } from './my-practical-exam.component';

describe('MyPracticalExamComponent', () => {
  let component: MyPracticalExamComponent;
  let fixture: ComponentFixture<MyPracticalExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPracticalExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPracticalExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
