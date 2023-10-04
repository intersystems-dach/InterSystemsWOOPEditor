import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserManger } from 'src/utils/classes';
import { ColorSchemeService } from '../../services/color-scheme.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { IrisinterfaceService } from '../../services/irisinterface.service';

@Component({
  selector: 'app-settings-short',
  templateUrl: './settings-short.component.html',
  styleUrls: ['./settings-short.component.scss'],
})
export class SettingsShortComponent {
  logIn: boolean = false;

  isLoading: boolean = false;

  constructor(
    private router: Router,
    private colorSchemeService: ColorSchemeService,
    private localStorageService: LocalStorageService,
    private apiService: IrisinterfaceService
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
    this.localStorageService.removePassword();
    this.localStorageService.removeUserName();
    this.localStorageService.setStayLoggedIn(false);
  }

  deploy() {
    this.isLoading = true;
    this.apiService
      .deployAll(UserManger.userName, UserManger.password)
      .subscribe({
        next: (data) => {
          this.isLoading = false;

          if (data.status) {
            alert(data.message);
          } else {
            alert('ERROR: ' + data.message);
          }
        },
        error: (err: any) => {
          this.isLoading = false;

          alert(err.message);
        },
      });
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

  goToAdvancedSettings() {
    this.router.navigate(['/settings/storage']);
  }
  hoToHelp() {
    this.router.navigate(['/help']);
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
