import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserManger } from 'src/utils/classes';
import { ColorSchemeService } from '../services/color-scheme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  showSettings = false;

  constructor(
    private router: Router,
    private colorSchemeService: ColorSchemeService
  ) {}

  logIn() {
    this.router.navigate(['/login']);
  }

  logOut() {
    UserManger.userLevel = 0;
    UserManger.userName = '';
  }

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
    return this.colorSchemeService.darkModeEnabled;
  }
}
