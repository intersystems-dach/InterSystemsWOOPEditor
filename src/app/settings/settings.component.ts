import { Component, HostListener } from '@angular/core';
import { MarkdownContentComponent } from '../markdown-content/markdown-content.component';
import { Router } from '@angular/router';
import { UserManger } from 'src/utils/classes';
import { ApiService } from '../services/api.service';
import { ColorSchemeService } from '../services/color-scheme.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent {
  logIn: boolean = false;

  constructor(
    private router: Router,
    private colorSchemeService: ColorSchemeService,
    private localStorageService: LocalStorageService
  ) {}

  increaseFontSize() {
    this.localStorageService.setFontSize(
      this.localStorageService.getFontSize() + 2
    );
  }

  decreaseFontSize() {
    let fontSize = this.localStorageService.getFontSize();
    if (fontSize > 2) {
      this.localStorageService.setFontSize(fontSize - 2);
    }
  }

  getFontSize() {
    return this.localStorageService.getFontSize();
  }

  @HostListener('document:keydown.control.alt.l', ['$event'])
  toggleLogIn() {
    this.logIn = !this.logIn;
    if (this.logIn) {
      this.router.navigate(['/login']);
    }
  }

  logOut() {
    UserManger.userLevel = 0;
    UserManger.userName = '';
  }

  getuserLevel() {
    return UserManger.userLevel;
  }

  getUserName() {
    return UserManger.userName;
  }

  getDarkModeEnabled() {
    return this.colorSchemeService.darkModeEnabled;
  }

  toggleDarkMode() {
    this.colorSchemeService.darkModeEnabled =
      !this.colorSchemeService.darkModeEnabled;
    if (this.colorSchemeService.darkModeEnabled) {
      this.colorSchemeService.darkMode();
    } else {
      this.colorSchemeService.lightMode();
    }
  }
}
