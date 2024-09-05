import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpracticalComponent } from './addpractical.component';

describe('AddpracticalComponent', () => {
  let component: AddpracticalComponent;
  let fixture: ComponentFixture<AddpracticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpracticalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpracticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
