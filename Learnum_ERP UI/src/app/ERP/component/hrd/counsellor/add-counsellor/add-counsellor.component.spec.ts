import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCounsellorComponent } from './add-counsellor.component';

describe('AddCounsellorComponent', () => {
  let component: AddCounsellorComponent;
  let fixture: ComponentFixture<AddCounsellorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCounsellorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCounsellorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
