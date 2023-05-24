import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterSelectionComponent } from './chapter-selection.component';

describe('ChapterSelectionComponent', () => {
  let component: ChapterSelectionComponent;
  let fixture: ComponentFixture<ChapterSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChapterSelectionComponent]
    });
    fixture = TestBed.createComponent(ChapterSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
