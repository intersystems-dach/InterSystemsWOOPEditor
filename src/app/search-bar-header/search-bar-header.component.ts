import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Chapter, UserManger } from 'src/utils/classes';
import { ChaptermanagerService } from '../services/chaptermanager.service';
import { ColorSchemeService } from '../services/color-scheme.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-search-bar-header',
  templateUrl: './search-bar-header.component.html',
  styleUrls: ['./search-bar-header.component.sass'],
})
export class SearchBarHeaderComponent {
  searchValue: string = '';
  noMatches: boolean = false;
  slideOut: boolean = false;

  @Output() close: EventEmitter<string> = new EventEmitter<string>();

  @Input() chapter: Chapter | null = null;

  constructor(
    private chapterManager: ChaptermanagerService,
    private colorSchemeService: ColorSchemeService,
    private router: Router
  ) {
    router.events.forEach((event) => {
      this.closeSearchBar();
    });
  }

  @HostListener('document:keydown.escape', ['$event'])
  closeSearchBar() {
    this.slideOut = true;
    this.searchValue = '';
    this.onSearchChange();
    setTimeout(() => {
      this.close.emit();
      this.slideOut = false;
    }, 500);
  }


  onSearchChange(): void {
    if (this.chapter == null) {
      this.searchAllChapters();
    } else {
      this.searchChapter();
    }
  }

  searchChapter(): void {}

  searchAllChapters(): void {
    if (this.searchValue == '') {
      this.chapterManager.chapters = this.chapterManager.allChapters;
      this.noMatches = false;
      return;
    }

    let lowerSearchValue = this.searchValue.toLowerCase();
    if (lowerSearchValue == 'admin') {
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }
    if (lowerSearchValue == 'banana') {
      window.location.href = 'https://www.youtube.com/watch?v=9EcjWd-O4jI';
    }
    if (lowerSearchValue == 'pbonin') {
      window.location.href = 'https://philipp-bonin.com/';
    }
    if (lowerSearchValue == 'funky') {
      this.colorSchemeService.funkyMode();
    }

    let words = lowerSearchValue.split(' ');
    let filteredChapters: Chapter[] = [];
    for (let word of words) {
      for (let chapter of this.chapterManager.allChapters) {
        if (chapter.IsPrivate) {
          if (UserManger.userLevel == 0) {
            continue;
          }
          if (
            UserManger.userLevel == 1 &&
            chapter.Author != UserManger.userName
          ) {
            continue;
          }
        }
        if (
          (!filteredChapters.includes(chapter) &&
            (chapter.Title.toLowerCase().includes(word) ||
              chapter.Description.toLowerCase().includes(word) ||
              chapter.Language.toLowerCase().includes(word) ||
              chapter.Author.toLowerCase().includes(word))) ||
          ('private'.includes(word) && chapter.IsPrivate)
        ) {
          filteredChapters.push(chapter);
        }
      }
    }
    this.noMatches = filteredChapters.length == 0;
    this.chapterManager.chapters = filteredChapters;
  }

  @HostListener('document:keydown.control.alt.c', ['$event'])
  clear(): void {
    this.searchValue = '';
    this.onSearchChange();
  }
}
