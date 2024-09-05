import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsyllabusComponent } from './addsyllabus.component';

describe('AddsyllabusComponent', () => {
  let component: AddsyllabusComponent;
  let fixture: ComponentFixture<AddsyllabusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsyllabusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
