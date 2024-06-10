import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrdComponent } from './hrd.component';

describe('HrdComponent', () => {
  let component: HrdComponent;
  let fixture: ComponentFixture<HrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
