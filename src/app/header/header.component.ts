import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../utils/interfaces';
import { UserManger } from 'src/utils/classes';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  showSettings = false;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']);
  }

  toggleSettings() {
    this.showSettings = !this.showSettings;
  }

  getUserLevel() {
    return UserManger.userLevel;
  }

  getUserName() {
    return UserManger.userName;
  }

  getDarkModeEnabled() {
    return AppComponent.darkModeEnabled;
  }
}
