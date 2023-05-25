import { Component, Input, EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.sass'],
})
export class LogInComponent {
  enteredPassword: string = '';
  enteredUsername: string = '';

  isWrong: boolean = false;
  type: string = 'password';

  @Output() closeEmitter = new EventEmitter<boolean>();

  submit() {
    let users = AppComponent.globalConfig.users;
    for (let user of users) {
      if (
        user.username === this.enteredUsername &&
        user.password === this.enteredPassword
      ) {
        AppComponent.UserLevel = user.level;
        AppComponent.UserName = user.username;
        this.isWrong = false;
        this.enteredPassword = '';
        this.enteredUsername = '';
        this.closeEmitter.emit();
        return;
      }
    }

    this.isWrong = true;
    this.enteredPassword = '';
    this.enteredUsername = '';
  }
  viewPassword() {
    if (this.type === 'password') {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
  close() {
    this.closeEmitter.emit();
    this.isWrong = false;
    this.enteredPassword = '';
    this.enteredUsername = '';
  }
}
