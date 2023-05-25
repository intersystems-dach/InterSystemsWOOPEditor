import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Chapter } from 'src/utils/classes';
@Component({
  selector: 'app-chapter-selection',
  templateUrl: './chapter-selection.component.html',
  styleUrls: ['./chapter-selection.component.sass'],
})
export class ChapterSelectionComponent {
  @Input() chapters: Chapter[] = [];

  @Output() chapterSelected = new EventEmitter<string>();

  onChapterSelected(chapterName: string) {
    this.chapterSelected.emit(chapterName);
  }
}
