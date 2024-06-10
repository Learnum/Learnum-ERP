import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDashboardERPComponent } from './my-dashboard-erp.component';

describe('MyDashboardERPComponent', () => {
  let component: MyDashboardERPComponent;
  let fixture: ComponentFixture<MyDashboardERPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDashboardERPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDashboardERPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
