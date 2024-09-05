import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiblePersonInfoComponent } from './responsible-person-info.component';

describe('ResponsiblePersonInfoComponent', () => {
  let component: ResponsiblePersonInfoComponent;
  let fixture: ComponentFixture<ResponsiblePersonInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsiblePersonInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiblePersonInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
