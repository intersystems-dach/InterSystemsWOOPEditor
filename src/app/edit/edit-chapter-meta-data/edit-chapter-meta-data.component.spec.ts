import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChapterMetaDataComponent } from './edit-chapter-meta-data.component';

describe('EditChapterMetaDataComponent', () => {
  let component: EditChapterMetaDataComponent;
  let fixture: ComponentFixture<EditChapterMetaDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditChapterMetaDataComponent]
    });
    fixture = TestBed.createComponent(EditChapterMetaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
