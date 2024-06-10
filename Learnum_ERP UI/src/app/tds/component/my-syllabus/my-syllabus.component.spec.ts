import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySyllabusComponent } from './my-syllabus.component';

describe('MySyllabusComponent', () => {
  let component: MySyllabusComponent;
  let fixture: ComponentFixture<MySyllabusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySyllabusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
