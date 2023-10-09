export class Chapter {
  public Title: string;
  public Pages: Page[];
  public Password: string;
  public Language: string;
  public Author: string;
  public Description: string;
  public IsPrivate: boolean;
  constructor(
    Title: string,
    Author: string,
    Pages: Page[],
    Password: string = '',
    Language: string = 'en',
    Description: string = '',
    IsPrivate: boolean = false
  ) {
    this.Title = Title;
    this.Pages = Pages;
    this.Password = Password;
    this.Language = Language;
    this.Author = Author;
    this.Description = Description;
    this.IsPrivate = IsPrivate;

    this.setUndefinedValues();
  }

  setUndefinedValues() {
    if (this.Password === undefined) {
      this.Password = '';
    }
    if (this.Language === undefined) {
      this.Language = '';
    }
    if (this.Author === undefined) {
      this.Author = '';
    }
    if (this.Password === undefined) {
      this.Password = '';
    }
    if (this.Description === undefined) {
      this.Description = '';
    }
  }

  getPageForHeading(heading: string, trim = true): number {
    if (trim) {
      heading = heading.toLowerCase().replace(/\s/g, '-');
    }
    for (let i = 0; i < this.Pages.length; i++) {
      let page = this.Pages[i];
      for (let line of page.Content.split('\n')) {
        if (line.startsWith('#')) {
          if (trim) {
            line = line.toLowerCase().replace(/\s/g, '-');
          }
          if (line.includes(heading)) {
            return i;
          }
        }
      }
    }
    return -1;
  }

  addPageAt(page: Page, index: number) {
    if (index >= this.Pages.length) {
      this.Pages.push(page);
      return;
    }
    this.Pages = this.Pages.splice(index, 0, page);
  }
}

export class Page {
  public Content: string;
  public Hint: string;
  public Result: string;
  constructor(Content: string, Hint: string = '', Result: string = '') {
    this.Content = Content;
    this.Hint = Hint;
    this.Result = Result;
  }
}

export enum userLevel {
  NONE = 0,
  USER = 1,
  ADMIN = 2,
}

export class UserManger {
  public static userLevel = userLevel.NONE;
  public static userName = '';
  public static password = '';
}

export class VerifyCache {
  private static verifyCache: any[] = [];

  static isChapterVerified(chapterName: string): boolean {
    for (let chapter of this.verifyCache) {
      if (chapter.name == chapterName) {
        return true;
      }
    }
    return false;
  }

  static verifyChapter(chapterName: string, password: string, save = true) {
    for (let x of this.verifyCache) {
      if (x.name == chapterName) {
        x.pwd = password;
        return;
      }
    }
    this.verifyCache.push({ name: chapterName, pwd: password });
    if (password == '') {
      return;
    }
    if (save) {
      localStorage.setItem('verifyCache', JSON.stringify(this.verifyCache));
    }
  }

  static setCache(cache: any[]) {
    this.verifyCache = cache;
  }
}

export class Version {
  public version: string;
  public date: string;
  public changes: string[];

  constructor(version: string, date: string, changes: string[]) {
    this.version = version;
    this.date = date;
    this.changes = changes;
  }
}
