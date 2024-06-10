import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyllabusCompletionComponent } from './syllabus-completion.component';

describe('SyllabusCompletionComponent', () => {
  let component: SyllabusCompletionComponent;
  let fixture: ComponentFixture<SyllabusCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyllabusCompletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyllabusCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
