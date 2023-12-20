import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationComponent } from 'src/app/notification/notification.component';
import { IrisinterfaceService } from 'src/app/services/irisinterface.service';
import { UserManger } from 'src/utils/classes';

@Component({
  selector: 'app-deploy-spec',
  templateUrl: './deploy-spec.component.html',
  styleUrls: ['./deploy-spec.component.sass'],
})
export class DeploySpecComponent {
  ignoreWaitingTime: boolean = true;
  pushToGit: boolean = true;
  pushAll: boolean = false;

  isLoading: boolean = false;

  constructor(
    private router: Router,
    private apiService: IrisinterfaceService
  ) {
    if (UserManger.userLevel != 2) {
      this.router.navigate(['/']);
      return;
    }
  }

  togglePushAll() {
    this.pushAll = !this.pushAll;
  }

  togglePushToGit() {
    this.pushToGit = !this.pushToGit;
  }

  toggleIgnoreWaitingTime() {
    this.ignoreWaitingTime = !this.ignoreWaitingTime;
  }

  submit() {
    this.isLoading = true;

    this.apiService
      .deployAll(
        UserManger.userName,
        UserManger.password,
        this.ignoreWaitingTime,
        this.pushToGit,
        this.pushAll
      )
      .subscribe({
        next: (data) => {
          this.isLoading = false;

          if (data.status && !data.message.toLowerCase().startsWith('error')) {
            NotificationComponent.showNotification('Success', data.message, -1);
          } else {
            NotificationComponent.showNotification(
              'Unsuccessful',
              data.message,
              -1,
              true
            );
          }
          this.close();
        },
        error: (err: any) => {
          this.isLoading = false;
          NotificationComponent.showNotification(
            'ERROR',
            'Error deploying: ' + err.message + '!',
            -1,
            true
          );
          this.close();
        },
      });
  }

  @HostListener('document:keydown.escape', ['$event'])
  close() {
    this.router.navigate(['/']);
  }
}
