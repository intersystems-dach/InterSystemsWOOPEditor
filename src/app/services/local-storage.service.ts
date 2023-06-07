import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setColorScheme(darkMode: boolean) {
    localStorage.setItem('colorScheme', darkMode ? 'dark' : 'light');
  }

  getColorScheme(): string {
    let colorScheme = localStorage.getItem('colorScheme');
    if (colorScheme == null) {
      return 'light';
    }
    return colorScheme;
  }

  setFontSize(fontSize: number) {
    localStorage.setItem('fontSize', fontSize.toString());
  }

  getFontSize(): number {
    let fontSize = localStorage.getItem('fontSize');
    if (fontSize == null) {
      return 16;
    }
    return parseInt(fontSize);
  }

  setPageForChapter(chapterTitle: string, page: number) {
    localStorage.setItem(chapterTitle, page.toString());
  }

  getPageForChapter(chapterTitle: string): number {
    let page = localStorage.getItem(chapterTitle);
    if (page == null) {
      return 0;
    }
    return parseInt(page);
  }
}
