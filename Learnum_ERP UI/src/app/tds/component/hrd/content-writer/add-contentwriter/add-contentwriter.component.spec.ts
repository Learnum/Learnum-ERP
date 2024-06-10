import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContentwriterComponent } from './add-contentwriter.component';

describe('AddContentwriterComponent', () => {
  let component: AddContentwriterComponent;
  let fixture: ComponentFixture<AddContentwriterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContentwriterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContentwriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
