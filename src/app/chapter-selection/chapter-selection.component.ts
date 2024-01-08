import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { Chapter, UserManger } from 'src/utils/classes';
import { ColorSchemeService } from '../services/color-scheme.service';
import { IrisinterfaceService } from '../services/irisinterface.service';
import { NotificationComponent } from '../notification/notification.component';
@Component({
  selector: 'app-chapter-selection',
  templateUrl: './chapter-selection.component.html',
  styleUrls: ['./chapter-selection.component.scss'],
})
export class ChapterSelectionComponent {
  @Input() chapters: Chapter[] = [];

  @Output() chapterSelected = new EventEmitter<string>();
  @Output() chapterEditSelected = new EventEmitter<string>();

  newChapter: boolean = false;

  chapterToDelete: Chapter | undefined = undefined;

  constructor(
    private apiService: IrisinterfaceService,
    private colorSchemeService: ColorSchemeService
  ) {}

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
    this.apiService
      .deleteChapter(chapter, UserManger.userName, UserManger.password)
      .subscribe({
        next: (data) => {
          if (data.status) {
            this.chapters.splice(this.chapters.indexOf(chapter), 1);
            NotificationComponent.showNotification(
              'Chapter deleted',
              'The chapter was deleted successfully!'
            );
          } else {
            NotificationComponent.showNotification(
              'Chapter could not be deleted',
              'The chapter could not be deleted!',
              5000,
              true
            );
          }
        },
        error: (error) => {
          NotificationComponent.showNotification(
            'ERROR',
            'Chapter could not be deleted: ' + error.message + '!',
            -1,
            true
          );
        },
      });
  }

  isChapterAccessible(chapter: Chapter): boolean {
    return (
      this.getuserLevel() == 2 ||
      (this.getuserLevel() == 1 && this.getuserName() == chapter.Author)
    );
  }

  getuserLevel() {
    return UserManger.userLevel;
  }
  getuserName() {
    return UserManger.userName;
  }

  @HostListener('document:keydown.control.alt.n', ['$event'])
  toggleNewChapter() {
    this.newChapter = !this.newChapter;
  }

  getDarkModeEnabled() {
    return this.colorSchemeService.darkModeEnabled;
  }
}
