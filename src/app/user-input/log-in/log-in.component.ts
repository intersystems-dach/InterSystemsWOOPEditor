import { Component, Input, EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../../app.component';
import { ApiService } from '../../api.service';

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

  constructor(private apiService: ApiService) {}

  submit() {
    this.apiService
      .checkUser(this.enteredUsername, this.enteredPassword)
      .subscribe((data) => {
        if (data.level > 0) {
          AppComponent.UserLevel = data.level;
          AppComponent.UserName = data.username;
          this.isWrong = false;
          this.enteredPassword = '';
          this.enteredUsername = '';
          this.closeEmitter.emit();
          return;
        }
        this.isWrong = true;
        this.enteredPassword = '';
        this.enteredUsername = '';
      });
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
