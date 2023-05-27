import { Component } from '@angular/core';
import { MarkdownContentComponent } from '../markdown-content/markdown-content.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent {
  logIn: boolean = false;

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

  toggleLogIn() {
    this.logIn = !this.logIn;
  }

  logOut() {
    AppComponent.UserLevel = 0;
    AppComponent.UserName = '';
  }

  getUserLevel() {
    return AppComponent.UserLevel;
  }
}
