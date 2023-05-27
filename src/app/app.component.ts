import { Component, OnInit } from '@angular/core';
import { Chapter, Config } from 'src/utils/classes';
import { HttpClient } from '@angular/common/http';
import { UserLevel } from '../utils/classes';
import { ApiService } from './api.service';
import { EditChapterComponent } from './edit/edit-chapter/edit-chapter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'InterSystemsWOOP';

  public static UserLevel = UserLevel.NONE;
  public static UserName = '';
  public static chapters: Chapter[] = [];
  public static allChapters: Chapter[] = [];
  public static chapterSelected = false;
  public static chapterEditSelected = false;

  errorChapter = new Chapter(
    'Error 404',
    [],
    new Config('', '', '', '', false)
  );
  currentChapter: Chapter = this.errorChapter;

  constructor(private http: HttpClient, private apiService: ApiService) {}

  async ngOnInit() {
    /* let online = await this.apiService.isServerOnline();
    console.log('Server online: ' + online); */
    AppComponent.allChapters = await this.apiService
      .getAllChapters()
      .toPromise();
    for (let chapter of AppComponent.allChapters) {
      if (window.location.href.includes(chapter.title.replace(' ', '-'))) {
        this.currentChapter = chapter;
        AppComponent.chapterSelected = true;
      }
    }
    AppComponent.chapters = AppComponent.allChapters;
  }

  selectChapter(chapterName: string) {
    this.currentChapter = this.getChapterByName(chapterName);
    AppComponent.chapterSelected = true;
    if (AppComponent.UserLevel == UserLevel.ADMIN) {
      this.currentChapter.verified = true;
    }
    if (
      AppComponent.UserLevel == UserLevel.USER &&
      this.currentChapter.config.author == AppComponent.UserName
    ) {
      this.currentChapter.verified = true;
    }

    if (this.currentChapter.config.password === '') {
      this.currentChapter.verified = true;
    }
  }
  selectEditChapter(chapterName: string) {
    this.currentChapter = this.getChapterByName(chapterName);
    AppComponent.chapterEditSelected = true;
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

  public static goBack() {
    AppComponent.chapterSelected = false;
    AppComponent.chapterEditSelected = false;
    EditChapterComponent.autoSave = false;
    clearInterval(EditChapterComponent.interval);
    AppComponent.chapters = AppComponent.allChapters;
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
      AppComponent.chapterSelected = false;
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

  getChapterSelected() {
    return AppComponent.chapterSelected;
  }

  getChapterEditSelected() {
    return AppComponent.chapterEditSelected;
  }
}
