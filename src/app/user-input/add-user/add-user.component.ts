import { Component, HostListener } from '@angular/core';
import { UserManger } from 'src/utils/classes';
import { Location } from '@angular/common';
import { IrisinterfaceService } from 'src/app/services/irisinterface.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  enteredPassword: string = '';
  enteredConfirmPassword: string = '';
  entereduserName: string = '';

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
    if (this.entereduserName.length < 1) {
      this.wrongMessage = 'Username cannot be empty!';
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
      .addUser(
        UserManger.userName,
        UserManger.password,
        this.entereduserName,
        this.enteredPassword
      )
      .subscribe({
        next: (data: any) => {
          if (data.status) {
            alert('User added successfully!');
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
    this.entereduserName = '';
    this.enteredConfirmPassword = '';
    this.location.back();
  }
}
