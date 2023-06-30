import { Component, HostListener } from '@angular/core';
import { UserManger } from 'src/utils/classes';
import { Location } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { IrisinterfaceService } from 'src/app/services/irisinterface.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.sass'],
})
export class LogInComponent {
  enteredPassword: string = '';
  entereduserName: string = '';

  isWrong: boolean = false;
  wrongMessage: string = '';
  type: string = 'password';
  rememberMe: boolean = false;
  stayLoggedIn: boolean = false;

  constructor(
    private apiService: IrisinterfaceService,
    private location: Location,
    private localStorageService: LocalStorageService
  ) {
    this.rememberMe = localStorageService.getRememberPage();
    this.stayLoggedIn = localStorageService.getStayLoggedIn();
    let username = localStorageService.getUserName();
    if (username != null) {
      this.entereduserName = username;
    }
    let password = localStorageService.getPassword();
    if (password != null) {
      this.enteredPassword = password;
      this.submit();
    }
  }

  submit() {
    this.apiService
      .checkUser(this.entereduserName, this.enteredPassword)
      .subscribe({
        next: (data: any) => {
          if (data.level > 0) {
            UserManger.userLevel = data.level;
            UserManger.userName = data.username;
            UserManger.password = this.enteredPassword;
            if (this.rememberMe || this.stayLoggedIn) {
              this.localStorageService.setUserName(this.entereduserName);
              this.localStorageService.setPassword(this.enteredPassword);
            }
            this.localStorageService.setStayLoggedIn(this.stayLoggedIn);
            this.close();
          }
        },
        error: (err: Error) => {
          this.wrongMessage = err.message;
          this.isWrong = true;
          this.enteredPassword = '';
          this.entereduserName = '';
        },
      });
  }

  viewPassword() {
    if (this.type === 'password') {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  close() {
    this.isWrong = false;
    this.enteredPassword = '';
    this.entereduserName = '';
    this.location.back();
  }
}
