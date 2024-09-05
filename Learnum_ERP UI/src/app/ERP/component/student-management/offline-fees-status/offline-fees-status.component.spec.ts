import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineFeesStatusComponent } from './offline-fees-status.component';

describe('OfflineFeesStatusComponent', () => {
  let component: OfflineFeesStatusComponent;
  let fixture: ComponentFixture<OfflineFeesStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfflineFeesStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineFeesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
