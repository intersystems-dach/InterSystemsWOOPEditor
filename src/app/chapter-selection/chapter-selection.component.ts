import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chapter-selection',
  templateUrl: './chapter-selection.component.html',
  styleUrls: ['./chapter-selection.component.sass'],
})
export class ChapterSelectionComponent {
  @Input() chapterNames: string[] = [];

  @Output() chapterSelected = new EventEmitter<string>();

  onChapterSelected(chapterName: string) {
    this.chapterSelected.emit(chapterName);
  }
}
