import { Component, Input } from '@angular/core';
import { Chapter } from 'src/utils/classes';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.sass'],
})
export class ChapterComponent {
  @Input() chapter!: Chapter;
  @Input() currentPage: number = 0;

  tipVisible: boolean = false;
  resultVisible: boolean = false;

  showNextPage(): void {
    this.currentPage++;
    this.tipVisible = false;
    this.resultVisible = false;
  }

  showPrevPage(): void {
    this.currentPage--;
    this.tipVisible = false;
    this.resultVisible = false;
  }

  showTip() {
    this.tipVisible = true;
  }

  showResult() {
    this.resultVisible = true;
  }
}
