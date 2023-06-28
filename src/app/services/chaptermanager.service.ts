import { Injectable } from '@angular/core';
import { Chapter, VerifyCache } from 'src/utils/classes';
import { IrisinterfaceService } from './irisinterface.service';

@Injectable({
  providedIn: 'root',
})
export class ChaptermanagerService {
  public chapters: Chapter[] = [];
  public allChapters: Chapter[] = [];
  private initDone = false;

  private errorChapter = new Chapter('Error 404', '', []);

  currentChapter: Chapter = this.errorChapter;

  constructor(private apiService: IrisinterfaceService) {
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

      for (let page of chapter.Pages) {
        if (page.Content === undefined) {
          page.Content = '';
        }
        if (page.Hint === undefined) {
          page.Hint = '';
        }
        if (page.Result === undefined) {
          page.Result = '';
        }
      }

      if (chapter.Password === '') {
        VerifyCache.verifyChapter(chapter.Title);
      }
    }
    this.allChapters = this.sortChaptersAlphabetically(this.allChapters);
    this.chapters = this.allChapters;
    this.initDone = true;
  }

  sortChaptersAlphabetically(array: Chapter[]): Chapter[] {
    return array.sort((a, b) => {
      return a.Title.localeCompare(b.Title);
    });
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
