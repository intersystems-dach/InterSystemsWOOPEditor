import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { IrisinterfaceService } from 'src/app/services/irisinterface.service';
import { ChaptermanagerService } from '../../services/chaptermanager.service';
import { UserManger } from 'src/utils/classes';

@Component({
  selector: 'app-select-chapter',
  templateUrl: './select-chapter.component.html',
  styleUrls: ['./select-chapter.component.sass'],
})
export class SelectChapterComponent {
  @Output() chapterEmitter = new EventEmitter<string>();
  selectedchapter = '';

  chapterNames: string[] = [];

  constructor(private chaptermanagerService: ChaptermanagerService) {}

  ngOnInit(): void {
    const allChapters = this.chaptermanagerService.allChapters;
    for (let chapter of allChapters) {
      if (UserManger.userLevel == 0) {
        return;
      }
      if (chapter.Author == UserManger.userName || UserManger.userLevel == 2) {
        this.chapterNames.push(chapter.Title);
      }
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  close() {
    this.chapterEmitter.emit('');
  }

  selectTheChapter() {
    this.chapterEmitter.emit(this.selectedchapter);
  }
}
