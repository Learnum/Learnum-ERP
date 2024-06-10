import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySyllabusErpComponent } from './my-syllabus-erp.component';

describe('MySyllabusErpComponent', () => {
  let component: MySyllabusErpComponent;
  let fixture: ComponentFixture<MySyllabusErpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySyllabusErpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySyllabusErpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
