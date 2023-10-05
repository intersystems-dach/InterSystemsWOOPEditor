import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  static visible = false;
  static message = '';
  static heading = '';
  static closing = false;
  static isError = false;
  static showNotification(
    heading: string,
    message: string,
    duration: number = 5000,
    isError: boolean = false
  ) {
    NotificationComponent.visible = true;
    NotificationComponent.message = message;
    NotificationComponent.heading = heading;
    NotificationComponent.isError = isError;
    if (duration < 0) return;
    setTimeout(() => {
      if (NotificationComponent.visible) {
        NotificationComponent.closeNotification();
      }
    }, duration);
  }

  static closeNotification() {
    NotificationComponent.closing = true;
    setTimeout(() => {
      NotificationComponent.visible = false;
      NotificationComponent.closing = false;
      NotificationComponent.isError = false;
      NotificationComponent.message = '';
      NotificationComponent.heading = '';
    }, 500);
  }

  getVisible() {
    return NotificationComponent.visible;
  }

  getMessage() {
    return NotificationComponent.message;
  }

  getHeading() {
    return NotificationComponent.heading;
  }

  getClosing() {
    return NotificationComponent.closing;
  }

  getIsError() {
    return NotificationComponent.isError;
  }

  close() {
    NotificationComponent.closeNotification();
  }
}
