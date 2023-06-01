import { Injectable } from '@angular/core';
import { Chapter, VerifyCache } from 'src/utils/classes';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ChaptermanagerService {
  public chapters: Chapter[] = [];
  public allChapters: Chapter[] = [];
  private initDone = false;

  private errorChapter = new Chapter('Error 404', '', []);

  currentChapter: Chapter = this.errorChapter;

  constructor(private apiService: ApiService) {
    this.init();
  }

  async init() {
    if (this.initDone) return;
    this.allChapters = await this.apiService.getAllChapters().toPromise();
    for (let chapter of this.allChapters) {
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

      if (chapter.Password === '') {
        VerifyCache.verifyChapter(chapter.Title);
      }
    }
    this.chapters = this.allChapters;
    this.initDone = true;
  }

  getChapterByName(chapterName: string, replaceWhitespaces: boolean): Chapter {
    chapterName = chapterName.toLowerCase();
    for (let chapter of this.chapters) {
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
    return this.errorChapter;
  }
}
