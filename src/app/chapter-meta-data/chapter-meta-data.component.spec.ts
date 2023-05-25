import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterMetaDataComponent } from './chapter-meta-data.component';

describe('ChapterMetaDataComponent', () => {
  let component: ChapterMetaDataComponent;
  let fixture: ComponentFixture<ChapterMetaDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChapterMetaDataComponent]
    });
    fixture = TestBed.createComponent(ChapterMetaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
