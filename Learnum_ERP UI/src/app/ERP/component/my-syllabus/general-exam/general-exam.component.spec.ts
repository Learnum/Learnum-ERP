import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralExamComponent } from './general-exam.component';

describe('GeneralExamComponent', () => {
  let component: GeneralExamComponent;
  let fixture: ComponentFixture<GeneralExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
