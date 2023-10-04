import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Chapter } from 'src/utils/classes';

@Component({
  selector: 'app-table-of-content',
  templateUrl: './table-of-content.component.html',
  styleUrls: ['./table-of-content.component.scss'],
})
export class TableOfContentComponent {
  @Output() event: EventEmitter<number> = new EventEmitter<number>();
  @Input() chapter: Chapter = undefined as any;
  headings: any[] = [];

  constructor() {}

  ngOnInit(): void {
    let incodeBlock = false;
    for (let i = 0; i < this.chapter.Pages.length; i++) {
      let page = this.chapter.Pages[i];
      let lines = page.Content.split('\n');
      for (let line of lines) {
        if (line.trim().startsWith('#') && !incodeBlock) {
          this.headings.push({
            level: line.match(/#/g)?.length,
            text: line.replace(/#/g, '').trim(),
            page: i,
          });
        }
        if (line.trim().startsWith('```') || line.trim().startsWith('~~~')) {
          incodeBlock = !incodeBlock;
        }
      }
    }
  }

  close() {
    this.event.emit(-1);
  }

  selectPage(page: number) {
    this.event.emit(page);
    this.event.emit(-1);
  }
}
