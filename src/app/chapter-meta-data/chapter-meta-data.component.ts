import { Component, Input } from '@angular/core';
import { Chapter } from 'src/utils/classes';

@Component({
  selector: 'app-chapter-meta-data',
  templateUrl: './chapter-meta-data.component.html',
  styleUrls: ['./chapter-meta-data.component.sass'],
})
export class ChapterMetaDataComponent {
  @Input() chapter!: Chapter;
}
