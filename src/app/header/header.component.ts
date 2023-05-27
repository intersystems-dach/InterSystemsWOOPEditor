import { Component, Output, EventEmitter } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  showSettings = false;
  goBack() {
    AppComponent.goBack();
  }
  toggleSettings() {
    this.showSettings = !this.showSettings;
  }
}
