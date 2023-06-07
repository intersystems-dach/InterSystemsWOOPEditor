import { Injectable } from '@angular/core';
import { IrisinterfaceService } from './irisinterface.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  rememberPage: boolean = true;

  constructor() {
    this.rememberPage = this.getRememberPage();
  }

  getRememberPage(): boolean {
    let rememberPage = localStorage.getItem('rememberPage');
    if (rememberPage == null) {
      return true;
    }
    return rememberPage == 'true';
  }

  setRememberPage(rememberPage: boolean) {
    localStorage.setItem('rememberPage', rememberPage ? 'true' : 'false');
    this.rememberPage = rememberPage;
  }

  setColorScheme(darkMode: boolean) {
    localStorage.setItem('colorScheme', darkMode ? 'dark' : 'light');
  }

  getColorScheme(): string {
    let colorScheme = localStorage.getItem('colorScheme');
    if (colorScheme == null) {
      return 'light';
    }
    return colorScheme;
  }

  setFontSize(fontSize: number) {
    localStorage.setItem('fontSize', fontSize.toString());
  }

  getFontSize(): number {
    let fontSize = localStorage.getItem('fontSize');
    if (fontSize == null) {
      return 16;
    }
    return parseInt(fontSize);
  }

  setPageForChapter(chapterTitle: string, page: number) {
    localStorage.setItem(chapterTitle, page.toString());
  }

  getPageForChapter(chapterTitle: string): number {
    if (!this.rememberPage) {
      return 0;
    }

    let page = localStorage.getItem(chapterTitle);
    if (page == null) {
      return 0;
    }
    return parseInt(page);
  }

  getServerHost(): string {
    let serverHost = localStorage.getItem('serverHost');
    if (serverHost == null) {
      return 'localhost';
    }
    return serverHost;
  }

  setServerHost(serverHost: string) {
    localStorage.setItem('serverHost', serverHost);
    IrisinterfaceService.host = serverHost;
  }

  getServerPort(): number {
    let serverPort = localStorage.getItem('serverPort');
    if (serverPort == null) {
      return 52773;
    }
    return parseInt(serverPort);
  }

  setServerPort(serverPort: number) {
    localStorage.setItem('serverPort', serverPort.toString());
    IrisinterfaceService.port = serverPort;
  }

  clearAll() {
    localStorage.clear();
  }
}
