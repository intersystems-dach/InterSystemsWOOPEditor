import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Chapter, UserManger } from 'src/utils/classes';
import { ColorSchemeService } from '../services/color-scheme.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  showSettings = false;

  @Input() enableSearchBar: boolean = true;
  @Input() chapter: Chapter | null = null;

  searchBarOn = false;

  constructor(
    private router: Router,
    private colorSchemeService: ColorSchemeService,
    private localStorageService: LocalStorageService
  ) {}

  logIn() {
    this.router.navigate(['/login']);
  }

  logOut() {
    UserManger.userLevel = 0;
    UserManger.userName = '';
    this.localStorageService.removePassword();
    this.localStorageService.removeUserName();
    this.localStorageService.setStayLoggedIn(false);
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
  turnOnSearchBar(){
    this.searchBarOn = true;
  }
  turnOffSearchBar(){
    this.searchBarOn = false;
  }
}
