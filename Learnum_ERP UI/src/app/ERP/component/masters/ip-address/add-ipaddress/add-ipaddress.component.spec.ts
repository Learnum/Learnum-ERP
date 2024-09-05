import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIpaddressComponent } from './add-ipaddress.component';

describe('AddIpaddressComponent', () => {
  let component: AddIpaddressComponent;
  let fixture: ComponentFixture<AddIpaddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIpaddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIpaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
