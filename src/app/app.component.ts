import { Component, OnInit } from '@angular/core';
import { Chapter, Config } from 'src/utils/classes';
import { HttpClient } from '@angular/common/http';
import config from 'src/assets/chapters/config.json';
import { FileManager } from '../utils/FileManager';
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
  public static globalConfig = config;

  chapterNames: string[] = config.chapterNames;
  chapters: Chapter[] = [];
  errorChapter = new Chapter('Error 404', [], new Config('', '', '', ''));
  currentChapter: Chapter = this.errorChapter;

  chapterSelected = false;

  constructor(private http: HttpClient, private apiService: ApiService) {}

  async ngOnInit() {
    this.apiService.getMessage().subscribe((data) => {
      console.log(data);
    });
    FileManager.init(this.http, AppComponent.baseURL);

    for (let chapterName of this.chapterNames) {
      let chapter = await FileManager.readChapter(chapterName);
      this.chapters.push(chapter);
    }

    for (let chapter of this.chapters) {
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

  goBack() {
    this.chapterSelected = false;
  }

  getChapterByName(chapterName: string): Chapter {
    for (let chapter of this.chapters) {
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

  getUserLevel() {
    return AppComponent.UserLevel;
  }

  getUserName() {
    return AppComponent.UserName;
  }
}
