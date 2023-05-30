import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Chapter, Config } from 'src/utils/classes';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-chapter-manger',
  templateUrl: './chapter-manger.component.html',
  styleUrls: ['./chapter-manger.component.sass'],
})
export class ChapterMangerComponent {
  private static errorChapter = new Chapter(
    'Error 404',
    [],
    new Config('', '', '', '', false)
  );
  public static currentChapter: Chapter = ChapterMangerComponent.errorChapter;
  public static chapters: Chapter[] = [];
  public static allChapters: Chapter[] = [];

  constructor(private http: HttpClient, private apiService: ApiService) {
    console.log('Getting all chapters');
    this.apiService.getAllChapters().subscribe((data) => {
      ChapterMangerComponent.allChapters = data;
      ChapterMangerComponent.chapters = data;
    });
  }

  async ngOnInit() {
    /* let online = await this.apiService.isServerOnline();
    console.log('Server online: ' + online); */
    console.log('Getting all chapters');
    ChapterMangerComponent.allChapters = await this.apiService
      .getAllChapters()
      .toPromise();
    ChapterMangerComponent.chapters = ChapterMangerComponent.allChapters;
    /* this.apiService.getAllChapters().subscribe((data) => {
      ChapterManger.chapters = data;
      ChapterManger.allChapters = data;
    }); */
    /* for (let chapter of AppComponent.allChapters) {
      if (window.location.href.includes(chapter.title.replace(' ', '-'))) {
        this.currentChapter = chapter;
        AppComponent.chapterSelected = true;
      }
    }
    AppComponent.chapters = AppComponent.allChapters; */
  }

  static getChapterByName(
    chapterName: string,
    replaceWhitespaces: boolean
  ): Chapter {
    for (let chapter of ChapterMangerComponent.chapters) {
      if (replaceWhitespaces) {
        if (chapter.title.replace(/\s/g, '-') == chapterName) {
          return chapter;
        }
      } else {
        if (chapter.title == chapterName) {
          return chapter;
        }
      }
    }
    return this.errorChapter;
  }
}
