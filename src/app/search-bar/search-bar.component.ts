import { Component, Host, HostListener } from '@angular/core';
import { Chapter, UserManger } from 'src/utils/classes';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.sass'],
})
export class SearchBarComponent {
  searchValue: string = '';
  noMatches: boolean = false;

  onSearchChange(): void {
    if (this.searchValue == '') {
      AppComponent.chapters = AppComponent.allChapters;
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

    let words = lowerSearchValue.split(' ');
    let filteredChapters: Chapter[] = [];
    for (let word of words) {
      for (let chapter of AppComponent.allChapters) {
        if (chapter.config.isPrivate) {
          if (UserManger.userLevel == 0) {
            continue;
          }
          if (
            UserManger.userLevel == 1 &&
            chapter.config.author != UserManger.userName
          ) {
            continue;
          }
        }
        if (
          (!filteredChapters.includes(chapter) &&
            (chapter.title.toLowerCase().includes(word) ||
              chapter.config.description.toLowerCase().includes(word) ||
              chapter.config.language.toLowerCase().includes(word) ||
              chapter.config.author.toLowerCase().includes(word))) ||
          ('private'.includes(word) && chapter.config.isPrivate)
        ) {
          filteredChapters.push(chapter);
        }
      }
    }
    this.noMatches = filteredChapters.length == 0;
    AppComponent.chapters = filteredChapters;
  }
  @HostListener('document:keydown.control.alt.c', ['$event'])
  clear(): void {
    this.searchValue = '';
    this.onSearchChange();
  }
}
