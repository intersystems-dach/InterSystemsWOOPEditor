import { Component, HostListener } from '@angular/core';
import { UserManger } from 'src/utils/classes';
import { Location } from '@angular/common';
import { IrisinterfaceService } from 'src/app/services/irisinterface.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass'],
})
export class ChangePasswordComponent {
  enteredPassword: string = '';
  enteredConfirmPassword: string = '';
  oldPassword: string = '';

  isWrong: boolean = false;
  wrongMessage: string = '';

  constructor(
    private apiService: IrisinterfaceService,
    private location: Location
  ) {}

  submit() {
    if (this.enteredPassword !== this.enteredConfirmPassword) {
      this.wrongMessage = 'Passwords do not match!';
      this.isWrong = true;
      this.enteredPassword = '';
      this.enteredConfirmPassword = '';
      return;
    }
    if (this.enteredPassword.length < 1) {
      this.wrongMessage = 'Password cannot be empty!';
      this.isWrong = true;
      this.enteredPassword = '';
      this.enteredConfirmPassword = '';
      return;
    }

    this.apiService
      .changePassword(
        UserManger.userName,
        this.oldPassword,
        this.enteredPassword
      )
      .subscribe({
        next: (data: any) => {
          if (data.status) {
            alert('Password changed successfully!');
            this.close();
          } else {
            this.wrongMessage = 'Something went wrong!';
            this.isWrong = true;
          }
        },
        error: (err: Error) => {
          this.wrongMessage = err.message;
          this.isWrong = true;
        },
      });
  }

  @HostListener('document:keydown.escape', ['$event'])
  close() {
    this.isWrong = false;
    this.enteredPassword = '';
    this.oldPassword = '';
    this.enteredConfirmPassword = '';
    this.location.back();
  }
}
