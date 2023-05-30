import { Component } from '@angular/core';
import { Chapter, Config } from 'src/utils/classes';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'InterSystemsWOOP';

  public static darkModeEnabled = false;

  public static chapters: Chapter[] = [];
  public static allChapters: Chapter[] = [];
  private static apiService: ApiService;
  private static initDone = false;
  private static errorChapter = new Chapter(
    'Error 404',
    [],
    new Config('', '', '', '', false)
  );
  static currentChapter: Chapter = AppComponent.errorChapter;

  constructor(private http: HttpClient, private apiService: ApiService) {
    AppComponent.apiService = apiService;
  }

  ngOnInit() {
    AppComponent.lightMode();
  }

  static async init() {
    if (AppComponent.initDone) return;
    AppComponent.allChapters = await this.apiService
      .getAllChapters()
      .toPromise();
    AppComponent.chapters = AppComponent.allChapters;
    AppComponent.initDone = true;
  }

  static getChapterByName(
    chapterName: string,
    replaceWhitespaces: boolean
  ): Chapter {
    chapterName = chapterName.toLowerCase();
    for (let chapter of AppComponent.chapters) {
      if (replaceWhitespaces) {
        if (chapter.title.replace(/\s/g, '-').toLowerCase() == chapterName) {
          return chapter;
        }
      } else {
        if (chapter.title.toLowerCase() == chapterName) {
          return chapter;
        }
      }
    }
    return AppComponent.errorChapter;
  }

  static darkMode() {
    document.documentElement.setAttribute('data-theme', 'dark');
    AppComponent.darkModeEnabled = true;
  }
  static lightMode() {
    document.documentElement.setAttribute('data-theme', 'light');
    AppComponent.darkModeEnabled = false;
  }

  static detectPrefersColorScheme(): string {
    // Detect if prefers-color-scheme is supported
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise, set it to Light.
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'darkMode'
        : 'lightMode';
    } else {
      // If the browser does not support prefers-color-scheme, set the default to dark.
      return 'darkMode';
    }
  }
}
