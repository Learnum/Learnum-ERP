import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounselorsPlanningComponent } from './counselors-planning.component';

describe('CounselorsPlanningComponent', () => {
  let component: CounselorsPlanningComponent;
  let fixture: ComponentFixture<CounselorsPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounselorsPlanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounselorsPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
