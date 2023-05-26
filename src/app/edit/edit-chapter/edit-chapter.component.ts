import { Component, Input } from '@angular/core';
import { Chapter, Page } from 'src/utils/classes';
import { ApiService } from '../../api.service';

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

  public static autoSave: boolean = false;
  public static interval: any;
  constructor(private apiService: ApiService) {}

  showNextPage(): void {
    this.currentPage++;
  }

  showPrevPage(): void {
    this.currentPage--;
  }

  addPage(): void {
    this.chapter.pages.push(new Page('', '', ''));
    this.currentPage = this.chapter.pages.length - 1;
    window.scrollTo({ top: 0 });
    this.changes = true;
  }

  deletePage(): void {
    this.chapter.pages.splice(this.currentPage, 1);
    this.currentPage = this.currentPage - 1;
    if (this.currentPage < 0) {
      this.currentPage = 0;
    }
    window.scrollTo({ top: 0 });
    this.changes = true;
  }

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

  togglePreview() {
    this.preview = !this.preview;
    window.scrollTo({ top: 0 });
  }

  toggleAutoSave() {
    EditChapterComponent.autoSave = !EditChapterComponent.autoSave;
    this.setAutoSave();
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
}
