import { Component } from '@angular/core';
import { UserManger } from 'src/utils/classes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.sass', '../stylesheet.sass'],
})
export class UserSettingsComponent {
  constructor(private router: Router) {}

  changePassword() {
    this.router.navigate(['changepassword']);
  }

  addUser() {
    this.router.navigate(['adduser']);
  }

  getUserLevel() {
    return UserManger.userLevel;
  }
}
