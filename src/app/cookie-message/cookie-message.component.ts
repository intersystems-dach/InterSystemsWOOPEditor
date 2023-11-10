import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-cookie-message',
  templateUrl: './cookie-message.component.html',
  styleUrls: ['./cookie-message.component.scss'],
})
export class CookieMessageComponent {
  static visible = false;

  acceptCookies() {
    LocalStorageService.acceptCookies();
    CookieMessageComponent.visible = false;
  }
  rejectCookies() {
    LocalStorageService.rejectCookies();
    CookieMessageComponent.visible = false;
  }

  isVisible() {
    return CookieMessageComponent.visible;
  }

  static show() {
    CookieMessageComponent.visible = true;
  }
}
