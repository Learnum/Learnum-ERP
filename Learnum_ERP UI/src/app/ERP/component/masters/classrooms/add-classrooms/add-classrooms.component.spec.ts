import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassroomsComponent } from './add-classrooms.component';

describe('AddClassroomsComponent', () => {
  let component: AddClassroomsComponent;
  let fixture: ComponentFixture<AddClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClassroomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
