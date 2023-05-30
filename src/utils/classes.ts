export class Chapter {
  public title: string;
  public pages: Page[];
  public verified: boolean = false;
  public config: Config;
  constructor(title: string, pages: Page[], config: Config) {
    this.title = title;
    this.pages = pages;
    this.config = config;
    if (this.config.password === '') {
      this.verified = true;
    }
  }
}

export class Page {
  public content: string;
  public tip: string;
  public result: string;
  constructor(content: string, tip: string = '', result: string = '') {
    this.content = content;
    this.tip = tip;
    this.result = result;
  }
}

export class Config {
  public password: string;
  public language: string;
  public author: string;
  public description: string;
  public isPrivate: boolean;
  constructor(
    password: string,
    language: string,
    author: string,
    description: string,
    isPrivate: boolean
  ) {
    this.password = password;
    this.language = language;
    this.author = author;
    this.description = description;
    this.isPrivate = isPrivate;
  }
}

export enum userLevel {
  NONE = 0,
  USER = 1,
  ADMIN = 2,
}

export class ChapterManger {
  private static errorChapter = new Chapter(
    'Error 404',
    [],
    new Config('', '', '', '', false)
  );
  public static currentChapter: Chapter = ChapterManger.errorChapter;
  public static chapters: Chapter[] = [];
  public static allChapters: Chapter[] = [];

  static getChapterByName(
    chapterName: string,
    replaceWhitespaces: boolean
  ): Chapter {
    for (let chapter of ChapterManger.chapters) {
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

export class UserManger {
  public static userLevel = userLevel.ADMIN;
  public static userName = '';
}
