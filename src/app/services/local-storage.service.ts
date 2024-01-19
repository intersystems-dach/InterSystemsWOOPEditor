import { Injectable } from '@angular/core';
import { IrisinterfaceService } from './irisinterface.service';
import { UserManger, VerifyCache } from 'src/utils/classes';
import { Router } from '@angular/router';
import { ChaptermanagerService } from './chaptermanager.service';
import { CookieMessageComponent } from '../cookie-message/cookie-message.component';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  rememberPage: boolean = true;

  static cookiesAccepted: boolean = false;

  constructor(private router: Router) {
    LocalStorageService.cookiesAccepted = this.getCookiesAccepted();
    if (!LocalStorageService.cookiesAccepted) {
      CookieMessageComponent.show();
    }

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

  getCookiesAccepted(): boolean {
    let rememberPage = localStorage.getItem('WOOPCookiesAccepted');
    if (rememberPage == null) {
      return false;
    }
    return rememberPage == 'true';
  }

  getLanguageTo(): string {
    let languageTo = localStorage.getItem('languageTo');
    if (languageTo == null) {
      return 'en';
    }
    return languageTo;
  }

  setLanguageTo(languageTo: string) {
    LocalStorageService.setLS('languageTo', languageTo);
  }

  getRememberPage(): boolean {
    let rememberPage = localStorage.getItem('rememberPage');
    if (rememberPage == null) {
      return true;
    }
    return rememberPage == 'true';
  }

  setRememberPage(rememberPage: boolean) {
    LocalStorageService.setLS('rememberPage', rememberPage ? 'true' : 'false');
    this.rememberPage = rememberPage;
  }

  setColorScheme(darkMode: boolean) {
    LocalStorageService.setLS('colorScheme', darkMode ? 'dark' : 'light');
  }

  getColorScheme(): string | null {
    let colorScheme = localStorage.getItem('colorScheme');
    return colorScheme;
  }

  setFontSize(fontSize: number) {
    LocalStorageService.setLS('fontSize', fontSize.toString());
  }

  getFontSize(): number {
    let fontSize = localStorage.getItem('fontSize');
    if (fontSize == null) {
      return 16;
    }
    return parseInt(fontSize);
  }

  setPageForChapter(chapterTitle: string, page: number) {
    LocalStorageService.setLS(chapterTitle, page.toString());
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
    LocalStorageService.setLS('serverHost', serverHost);
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
    LocalStorageService.setLS('serverPort', serverPort.toString());
    IrisinterfaceService.port = serverPort;
  }

  getServerProtocol(): string {
    let protocol = localStorage.getItem('serverProtocol');
    if (protocol == null) {
      return 'http';
    }
    return protocol;
  }

  setServerProtocol(protocol: string) {
    LocalStorageService.setLS('serverProtocol', protocol);
    IrisinterfaceService.protocol = protocol;
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  setUserName(userName: string) {
    LocalStorageService.setLS('userName', userName);
  }

  setStayLoggedIn(stayLoggedIn: boolean) {
    LocalStorageService.setLS('stayLoggedIn', stayLoggedIn ? 'true' : 'false');
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
    LocalStorageService.setLS('password', password);
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

  addServerConnection(
    name: string,
    host: string,
    port: number,
    protocol: string
  ) {
    let serverConnections = this.getAllServerConnections();
    for (let i = 0; i < serverConnections.length; i++) {
      if (serverConnections[i].name == name) {
        serverConnections.splice(i, 1);
      }
    }
    serverConnections.push({
      name: name,
      host: host,
      port: port,
      protocol: protocol,
    });
    LocalStorageService.setLS(
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
    LocalStorageService.setLS(
      'serverConnections',
      JSON.stringify(serverConnections)
    );
  }

  clearAll() {
    localStorage.clear();
  }

  static setLS(key: string, value: string) {
    if (!this.cookiesAccepted) {
      return;
    }
    localStorage.setItem(key, value);
  }

  static acceptCookies() {
    LocalStorageService.cookiesAccepted = true;
    LocalStorageService.setLS('WOOPCookiesAccepted', 'true');
  }

  static rejectCookies() {
    LocalStorageService.cookiesAccepted = false;
    localStorage.clear();
  }
}
