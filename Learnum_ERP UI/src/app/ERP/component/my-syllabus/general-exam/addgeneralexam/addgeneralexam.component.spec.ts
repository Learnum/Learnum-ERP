import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgeneralexamComponent } from './addgeneralexam.component';

describe('AddgeneralexamComponent', () => {
  let component: AddgeneralexamComponent;
  let fixture: ComponentFixture<AddgeneralexamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddgeneralexamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgeneralexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
