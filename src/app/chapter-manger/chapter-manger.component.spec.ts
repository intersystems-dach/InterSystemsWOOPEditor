import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterMangerComponent } from './chapter-manger.component';

describe('ChapterMangerComponent', () => {
  let component: ChapterMangerComponent;
  let fixture: ComponentFixture<ChapterMangerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChapterMangerComponent]
    });
    fixture = TestBed.createComponent(ChapterMangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
