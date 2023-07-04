import { Component } from '@angular/core';
import { UserManger } from 'src/utils/classes';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.sass', '../stylesheet.sass'],
})
export class UserSettingsComponent {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  changePassword() {
    this.router.navigate(['user/change/password']);
  }

  addUser() {
    this.router.navigate(['user/add']);
  }

  deleteUser() {
    this.router.navigate(['user/delete']);
  }

  makeUserAdmin() {
    this.router.navigate(['user/make/admin']);
  }

  logIn() {
    this.router.navigate(['login']);
  }

  logOut() {
    UserManger.userLevel = 0;
    UserManger.userName = '';
    this.localStorageService.removePassword();
    this.localStorageService.removeUserName();
    this.localStorageService.setStayLoggedIn(false);
  }

  getUserLevel() {
    return UserManger.userLevel;
  }

  getUsername() {
    return UserManger.userName;
  }
}
