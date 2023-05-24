import config from 'src/assets/chapters/config.json';
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
  public contentURL: string;
  public tipURL: string;
  public resultURL: string;
  constructor(contentURL: string, tipURL: string = '', resultURL: string = '') {
    this.contentURL = contentURL;
    this.tipURL = tipURL;
    this.resultURL = resultURL;
  }
}

export class Config {
  public password: string;
  public language: string;
  constructor(password: string, language: string) {
    this.password = password;
    this.language = language;
  }
}
