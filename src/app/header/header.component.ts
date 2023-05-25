import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  @Output() goBackEmitter = new EventEmitter<string>();
  showSettings = false;
  goBack() {
    this.goBackEmitter.emit();
  }
  toggleSettings() {
    this.showSettings = !this.showSettings;
  }
}
