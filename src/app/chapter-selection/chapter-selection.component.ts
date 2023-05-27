import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Chapter } from 'src/utils/classes';
import { AppComponent } from '../app.component';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-chapter-selection',
  templateUrl: './chapter-selection.component.html',
  styleUrls: ['./chapter-selection.component.sass'],
})
export class ChapterSelectionComponent {
  @Input() chapters: Chapter[] = [];

  @Output() chapterSelected = new EventEmitter<string>();
  @Output() chapterEditSelected = new EventEmitter<string>();

  newChapter: boolean = false;

  chapterToDelete: Chapter | undefined = undefined;

  constructor(private apiService: ApiService) {}

  onChapterSelected(chapterName: string) {
    this.chapterSelected.emit(chapterName);
  }

  onChapterEditSelected(chapterName: string) {
    this.chapterEditSelected.emit(chapterName);
  }

  setChapterToDelete(chapter: Chapter) {
    this.chapterToDelete = chapter;
  }

  areYouSure(value: boolean) {
    if (value) {
      this.deleteChapter(this.chapterToDelete!);
    }
    this.chapterToDelete = undefined;
  }

  deleteChapter(chapter: Chapter) {
    this.apiService.deleteChapter(chapter).subscribe((status) => {
      console.log(status);
      if (status.ok) {
        this.chapters.splice(this.chapters.indexOf(chapter), 1);
        alert('Chapter deleted');
      } else {
        alert('Chapter not deleted: ' + status.message);
      }
    });
  }

  getUserLevel() {
    return AppComponent.UserLevel;
  }
  getUserName() {
    return AppComponent.UserName;
  }

  toggleNewChapter() {
    this.newChapter = !this.newChapter;
  }
}
