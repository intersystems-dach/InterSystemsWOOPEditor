import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownCheatSheetComponent } from './markdown-cheat-sheet.component';

describe('MarkdownCheatSheetComponent', () => {
  let component: MarkdownCheatSheetComponent;
  let fixture: ComponentFixture<MarkdownCheatSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkdownCheatSheetComponent]
    });
    fixture = TestBed.createComponent(MarkdownCheatSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
