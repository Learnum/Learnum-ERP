import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyexamComponent } from './myexam.component';

describe('MyexamComponent', () => {
  let component: MyexamComponent;
  let fixture: ComponentFixture<MyexamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyexamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
