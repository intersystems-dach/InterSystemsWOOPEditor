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
}
