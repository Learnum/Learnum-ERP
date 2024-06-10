import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollegsComponent } from './add-collegs.component';

describe('AddCollegsComponent', () => {
  let component: AddCollegsComponent;
  let fixture: ComponentFixture<AddCollegsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCollegsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollegsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
