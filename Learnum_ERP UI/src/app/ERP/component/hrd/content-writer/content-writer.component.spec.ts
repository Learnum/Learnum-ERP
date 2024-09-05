import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentWriterComponent } from './content-writer.component';

describe('ContentWriterComponent', () => {
  let component: ContentWriterComponent;
  let fixture: ComponentFixture<ContentWriterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentWriterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentWriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
