import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterSearchComponent } from './chapter-search.component';

describe('ChapterSearchComponent', () => {
  let component: ChapterSearchComponent;
  let fixture: ComponentFixture<ChapterSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChapterSearchComponent]
    });
    fixture = TestBed.createComponent(ChapterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
