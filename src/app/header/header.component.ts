import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  @Output() goBackEmitter = new EventEmitter<string>();

  goBack() {
    this.goBackEmitter.emit();
  }
}
