import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-password-query',
  templateUrl: './password-query.component.html',
  styleUrls: ['./password-query.component.sass'],
})
export class PasswordQueryComponent {
  enteredPassword: string = '';
  isWrong: boolean = false;
  type: string = 'password';
  @Input() password: string = '';

  @Output() passwordEntered = new EventEmitter<boolean>();

  submit() {
    if (this.enteredPassword === this.password) {
      this.passwordEntered.emit(true);
      this.isWrong = false;
      this.enteredPassword = '';
    } else {
      this.isWrong = true;
      this.enteredPassword = '';
    }
  }
  viewPassword() {
    if (this.type === 'password') {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
  close() {
    this.passwordEntered.emit(false);
    this.isWrong = false;
    this.enteredPassword = '';
  }
}
