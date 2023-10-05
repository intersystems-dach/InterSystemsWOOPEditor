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
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar-header',
  templateUrl: './search-bar-header.component.html',
  styleUrls: ['./search-bar-header.component.scss'],
})
export class SearchBarHeaderComponent {
  searchValue: string = '';
  noMatches: boolean = false;
  slideOut: boolean = false;
  searchChapterResult: any[] = [];

  @Output() close: EventEmitter<string> = new EventEmitter<string>();
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

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

  searchChapter(): void {
    if (this.chapter == null) {
      return;
    }
    this.searchChapterResult = [];
    if (this.searchValue == '') {
      return;
    }

    let lowerSearchValue = this.searchValue.toLowerCase();
    let words = lowerSearchValue.split(' ');

    for (let i = 0; i < this.chapter.Pages.length; i++) {
      let page = this.chapter.Pages[i];
      if (page == null) {
        continue;
      }
      if (page.Content.toLowerCase().includes(lowerSearchValue)) {
        // get one word before and after
        let text = page.Content;
        let index = text.toLowerCase().indexOf(lowerSearchValue);
        let start = index;
        let spaceCount = 0;
        while (start > 0 && spaceCount < 2) {
          start--;
          if (text[start] == ' ') {
            spaceCount++;
          }
        }
        let end = index;
        spaceCount = 0;
        while (end < text.length && spaceCount < 2) {
          end++;
          if (text[end] == ' ') {
            spaceCount++;
          }
        }
        text = text.substring(start, end);
        this.searchChapterResult.push({
          page: i + 1,
          text: text,
        });
      }
    }

    /* for (let word of words) {
      if (word == '') {
        continue;
      }
      for(let i = 0; i < this.chapter.Pages.length; i++) {
        let page = this.chapter.Pages[i];
        if (page == null) {
          continue;
        }
        if (page.Content.toLowerCase().includes(word)) {
          // get one word before and after
          let text = page.Content;
          let index = text.toLowerCase().indexOf(word);
          let start = index;
          let spaceCount = 0;
          while (start > 0 && spaceCount < 3) {
            if (text[start] != ' '){
              spaceCount++;
            }
            start--;
          }
          let end = index;
          while (end < text.length && text[end] != ' ') {
            end++;
          }
          text = text.substring(start, end);
          if (
            this.searchChapterResult.filter(
              (x) => x.page == i + 1 && x.text == text
            ).length > 0
          ) {
            continue;
          }
          this.searchChapterResult.push({
            page: i + 1,
            text: text,
          });
        }
      }
    } */
  }

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
    if (lowerSearchValue == 'pong') {
      window.location.href =
        'https://intersystems-dach.github.io/InterSystemsPong/';
    }
    if (lowerSearchValue == 'funky') {
      this.colorSchemeService.funkyMode();
    }
    if (lowerSearchValue == 'ocean') {
      this.colorSchemeService.oceanMode();
    }
    if (lowerSearchValue == 'sunset') {
      this.colorSchemeService.sunsetMode();
    }
    if (lowerSearchValue == 'ruby') {
      this.colorSchemeService.rubyMode();
    }
    if (lowerSearchValue == 'coral') {
      this.colorSchemeService.coralMode();
    }
    if (lowerSearchValue == 'lavender') {
      this.colorSchemeService.lavenderMode();
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
