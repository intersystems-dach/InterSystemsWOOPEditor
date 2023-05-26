import { Component, OnInit } from '@angular/core';
import { Chapter, Config } from 'src/utils/classes';
import { HttpClient } from '@angular/common/http';
import { UserLevel } from '../utils/classes';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'InterSystemsWOOP';

  private static baseURL = 'assets/chapters/';

  public static UserLevel = UserLevel.NONE;
  public static UserName = '';
  public static chapters: Chapter[] = [];

  errorChapter = new Chapter('Error 404', [], new Config('', '', '', ''));
  currentChapter: Chapter = this.errorChapter;

  chapterSelected = false;
  chapterEditSelected = false;

  constructor(private http: HttpClient, private apiService: ApiService) {}

  async ngOnInit() {
    AppComponent.chapters = await this.apiService.getAllChapters().toPromise();
    console.log(AppComponent.chapters);
    for (let chapter of AppComponent.chapters) {
      if (window.location.href.includes(chapter.title.replace(' ', '-'))) {
        this.currentChapter = chapter;
        this.chapterSelected = true;
      }
    }
  }

  selectChapter(chapterName: string) {
    this.currentChapter = this.getChapterByName(chapterName);
    this.chapterSelected = true;
    if (AppComponent.UserLevel == UserLevel.ADMIN) {
      this.currentChapter.verified = true;
    }
    if (
      AppComponent.UserLevel == UserLevel.USER &&
      this.currentChapter.config.author == AppComponent.UserName
    ) {
      this.currentChapter.verified = true;
    }
  }
  selectEditChapter(chapterName: string) {
    this.currentChapter = this.getChapterByName(chapterName);
    this.chapterEditSelected = true;
    if (AppComponent.UserLevel == UserLevel.ADMIN) {
      this.currentChapter.verified = true;
    }
    if (
      AppComponent.UserLevel == UserLevel.USER &&
      this.currentChapter.config.author == AppComponent.UserName
    ) {
      this.currentChapter.verified = true;
    }
  }

  goBack() {
    this.chapterSelected = false;
    this.chapterEditSelected = false;
  }

  getChapterByName(chapterName: string): Chapter {
    for (let chapter of AppComponent.chapters) {
      if (chapter.title == chapterName) {
        return chapter;
      }
    }
    return this.errorChapter;
  }

  verifyChapter(value: boolean) {
    if (value) {
      this.currentChapter.verified = true;
    } else {
      this.chapterSelected = false;
    }
  }

  getChapters() {
    return AppComponent.chapters;
  }

  getUserLevel() {
    return AppComponent.UserLevel;
  }

  getUserName() {
    return AppComponent.UserName;
  }
}
