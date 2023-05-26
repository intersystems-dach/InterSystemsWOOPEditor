import { Component, Input } from '@angular/core';
import { Chapter, Page } from 'src/utils/classes';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit-chapter',
  templateUrl: './edit-chapter.component.html',
  styleUrls: ['./edit-chapter.component.sass'],
})
export class EditChapterComponent {
  @Input() chapter!: Chapter;
  currentPage: number = 0;

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
  }

  deletePage(): void {
    this.chapter.pages.splice(this.currentPage, 1);
    this.currentPage = this.currentPage - 1;
    if (this.currentPage < 0) {
      this.currentPage = 0;
    }
  }

  save() {
    this.apiService.updateChapter(this.chapter).subscribe((status) => {
      if (status.ok) {
        alert('Chapter saved!');
      } else {
        alert('Error saving chapter: ' + status.message);
      }
    });
  }
}
