import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdmissionsComponent } from './add-admissions.component';

describe('AddAdmissionsComponent', () => {
  let component: AddAdmissionsComponent;
  let fixture: ComponentFixture<AddAdmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdmissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
