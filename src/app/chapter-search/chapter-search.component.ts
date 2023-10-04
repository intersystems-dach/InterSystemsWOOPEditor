import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chapter-search',
  templateUrl: './chapter-search.component.html',
  styleUrls: ['./chapter-search.component.scss']
})
export class ChapterSearchComponent {

  @Input() results: any[] = [];
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  goToPage(page: number): void {
    this.pageChange.emit(page);
  }

}
