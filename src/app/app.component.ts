import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'InterSystemsWOOP';

  public static darkModeEnabled = false;

  /* public static chapters: Chapter[] = [];
  public static allChapters: Chapter[] = [];
  private static apiService: ApiService;
  private static initDone = false;

  private static errorChapter = new Chapter('Error 404', '', []);

  static currentChapter: Chapter = AppComponent.errorChapter;

  constructor(private http: HttpClient, private apiService: ApiService) {
    AppComponent.apiService = apiService;
  } */

  ngOnInit() {
    AppComponent.lightMode();
  }

  /* static async init() {
    if (AppComponent.initDone) return;
    AppComponent.allChapters = await this.apiService
      .getAllChapters()
      .toPromise();
    for (let chapter of AppComponent.allChapters) {
      if (chapter.Password === undefined) {
        chapter.Password = '';
      }
      if (chapter.Language === undefined) {
        chapter.Language = '';
      }
      if (chapter.Author === undefined) {
        chapter.Author = '';
      }
      if (chapter.IsPrivate === undefined) {
        chapter.IsPrivate = false;
      }
      if (chapter.Description === undefined) {
        chapter.Description = '';
      }
      if (chapter.Pages === undefined) {
        chapter.Pages = [];
      }

      //chapter.setUndefinedValues();
      if (chapter.Password === '') {
        VerifyCache.verifyChapter(chapter.Title);
      }
    }
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
        if (chapter.Title.replace(/\s/g, '-').toLowerCase() == chapterName) {
          return chapter;
        }
      } else {
        if (chapter.Title.toLowerCase() == chapterName) {
          return chapter;
        }
      }
    }
    return AppComponent.errorChapter;
  } */

  isDarkModeEnabled() {
    return AppComponent.darkModeEnabled;
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
