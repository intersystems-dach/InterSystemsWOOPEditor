import { Component, Host, HostListener, Input } from '@angular/core';
import { Chapter, Page } from 'src/utils/classes';
import { ApiService } from '../../api.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-edit-chapter',
  templateUrl: './edit-chapter.component.html',
  styleUrls: ['./edit-chapter.component.sass'],
})
export class EditChapterComponent {
  @Input() chapter!: Chapter;
  currentPage: number = 0;
  preview: boolean = false;
  changes: boolean = false;
  sureDelete: boolean = false;
  editMetaData: boolean = false;

  public static autoSave: boolean = false;
  public static interval: any;
  constructor(private apiService: ApiService) {}

  showNextPage(): void {
    if (this.currentPage == this.chapter.pages.length - 1) {
      return;
    }
    this.currentPage++;
    window.scrollTo({ top: 0 });
  }

  showPrevPage(): void {
    if (this.currentPage == 0) {
      return;
    }
    this.currentPage--;
    window.scrollTo({ top: 0 });
  }

  addPage(): void {
    this.chapter.pages.push(new Page('', '', ''));
    this.currentPage = this.chapter.pages.length - 1;
    window.scrollTo({ top: 0 });
    this.changes = true;
  }

  setSureDelete(value: boolean): void {
    this.sureDelete = value;
  }

  deletePage(value: boolean): void {
    if (value) {
      this.chapter.pages.splice(this.currentPage, 1);
      this.currentPage = this.currentPage - 1;
      if (this.currentPage < 0) {
        this.currentPage = 0;
      }
      window.scrollTo({ top: 0 });
      this.changes = true;
    }
    this.sureDelete = false;
  }

  @HostListener('document:keydown.control.alt.s', ['$event'])
  save(alertSaved: boolean = true) {
    this.apiService.updateChapter(this.chapter).subscribe((status) => {
      if (status.ok) {
        if (alertSaved) {
          alert('Chapter saved!');
        }
        this.changes = false;
      } else {
        alert('Error saving chapter: ' + status.message);
      }
    });
  }

  onChange() {
    this.changes = true;
  }

  togglePreview() {
    this.preview = !this.preview;
    window.scrollTo({ top: 0 });
  }

  toggleAutoSave() {
    EditChapterComponent.autoSave = !EditChapterComponent.autoSave;
    this.setAutoSave();
  }

  toggleEditMetaData() {
    this.editMetaData = !this.editMetaData;
  }

  getAutoSave() {
    return EditChapterComponent.autoSave;
  }

  setAutoSave() {
    if (EditChapterComponent.autoSave) {
      EditChapterComponent.interval = setInterval(() => {
        this.save(false);
      }, 5000);
    } else {
      clearInterval(EditChapterComponent.interval);
    }
  }

  goBack() {
    AppComponent.goBack();
  }
}
