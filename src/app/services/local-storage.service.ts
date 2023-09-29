import { Injectable } from '@angular/core';
import { IrisinterfaceService } from './irisinterface.service';
import { UserManger, VerifyCache } from 'src/utils/classes';
import { Router } from '@angular/router';
import { ChaptermanagerService } from './chaptermanager.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  rememberPage: boolean = true;

  constructor(private router: Router) {
    this.rememberPage = this.getRememberPage();
    if (this.getStayLoggedIn()) {
      const username = this.getUserName();
      const password = this.getPassword();
      if (username != null && password != null) {
        this.router.navigate(['/login']);
        this.setStayLoggedIn(true);
      }
    }

    let verifyCache: any = localStorage.getItem('verifyCache');
    if (verifyCache == null) {
      verifyCache = [];
    } else {
      verifyCache = JSON.parse(verifyCache);
    }
    for (let entry of verifyCache) {
      VerifyCache.verifyChapter(entry.name, entry.pwd, false);
    }
  }

  getLanguageTo(): string {
    let languageTo = localStorage.getItem('languageTo');
    if (languageTo == null) {
      return 'en';
    }
    return languageTo;
  }

  setLanguageTo(languageTo: string) {
    localStorage.setItem('languageTo', languageTo);
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

  getColorScheme(): string | null {
    let colorScheme = localStorage.getItem('colorScheme');
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

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  setUserName(userName: string) {
    localStorage.setItem('userName', userName);
  }

  setStayLoggedIn(stayLoggedIn: boolean) {
    localStorage.setItem('stayLoggedIn', stayLoggedIn ? 'true' : 'false');
  }

  getStayLoggedIn(): boolean {
    let stayLoggedIn = localStorage.getItem('stayLoggedIn');
    if (stayLoggedIn == null) {
      return false;
    }
    return stayLoggedIn == 'true';
  }

  removeUserName() {
    localStorage.removeItem('userName');
  }

  getPassword(): string | null {
    return localStorage.getItem('password');
  }

  setPassword(password: string) {
    localStorage.setItem('password', password);
  }

  removePassword() {
    localStorage.removeItem('password');
  }

  getAllServerConnections(): any[] {
    let serverConnections = localStorage.getItem('serverConnections');
    if (serverConnections == null) {
      return [];
    }
    return JSON.parse(serverConnections);
  }

  getConnection(name: string) {
    let serverConnections = this.getAllServerConnections();
    for (let i = 0; i < serverConnections.length; i++) {
      if (serverConnections[i].name == name) {
        return serverConnections[i];
      }
    }
    return null;
  }

  addServerConnection(name: string, host: string, port: number) {
    let serverConnections = this.getAllServerConnections();
    for (let i = 0; i < serverConnections.length; i++) {
      if (serverConnections[i].name == name) {
        serverConnections.splice(i, 1);
      }
    }
    serverConnections.push({ name: name, host: host, port: port });
    localStorage.setItem(
      'serverConnections',
      JSON.stringify(serverConnections)
    );
  }

  removeServerConnection(name: string) {
    let serverConnections = this.getAllServerConnections();
    for (let i = 0; i < serverConnections.length; i++) {
      if (serverConnections[i].name == name) {
        serverConnections.splice(i, 1);
        break;
      }
    }
    localStorage.setItem(
      'serverConnections',
      JSON.stringify(serverConnections)
    );
  }

  clearAll() {
    localStorage.clear();
  }
}
