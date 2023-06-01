import { Component, HostListener } from '@angular/core';
import { MarkdownContentComponent } from '../markdown-content/markdown-content.component';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { UserManger } from 'src/utils/classes';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent {
  logIn: boolean = false;

  constructor(private router: Router, private apiService: ApiService) {}

  increaseFontSize() {
    MarkdownContentComponent.fontSize += 2;
  }

  decreaseFontSize() {
    if (MarkdownContentComponent.fontSize > 2) {
      MarkdownContentComponent.fontSize -= 2;
    }
  }

  getFontSize() {
    return MarkdownContentComponent.fontSize;
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
    return AppComponent.darkModeEnabled;
  }

  toggleDarkMode() {
    AppComponent.darkModeEnabled = !AppComponent.darkModeEnabled;
    if (AppComponent.darkModeEnabled) {
      AppComponent.darkMode();
    } else {
      AppComponent.lightMode();
    }

    if (UserManger.userLevel > 0) {
      this.apiService
        .setColorSchemaForUser(
          UserManger.userName,
          AppComponent.darkModeEnabled
        )
        .subscribe((data: any) => {
          console.log('set color schema');
        });
    }
  }
}
