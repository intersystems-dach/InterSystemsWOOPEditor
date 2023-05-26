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
  constructor(
    password: string,
    language: string,
    author: string,
    description: string
  ) {
    this.password = password;
    this.language = language;
    this.author = author;
    this.description = description;
  }
}

export enum UserLevel {
  NONE = 0,
  USER = 1,
  ADMIN = 2,
}
