import { Component, HostListener } from '@angular/core';
import { UserManger } from 'src/utils/classes';
import { Location } from '@angular/common';
import { IrisinterfaceService } from 'src/app/services/irisinterface.service';
import { NotificationComponent } from 'src/app/notification/notification.component';

@Component({
  selector: 'app-make-admin',
  templateUrl: './make-admin.component.html',
  styleUrls: ['./make-admin.component.scss'],
})
export class MakeAdminComponent {
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
    this.apiService
      .makeUserAdmin(
        UserManger.userName,
        this.enteredPassword,
        this.entereduserName
      )
      .subscribe({
        next: (data: any) => {
          if (data.status) {
            NotificationComponent.showNotification(
              'User made admin successfully!',
              'The user was made admin successfully!'
            );
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
