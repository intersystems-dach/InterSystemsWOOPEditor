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
}

export class VerifyCache {
  private static verifyCache: any[] = [];

  static isChapterVerified(chapterName: string): boolean {
    for (let chapter of this.verifyCache) {
      if (chapter == chapterName) {
        return true;
      }
    }
    return false;
  }

  static verifyChapter(chapterName: string) {
    this.verifyCache.push(chapterName);
  }
}
