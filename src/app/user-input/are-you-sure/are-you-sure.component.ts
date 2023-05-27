import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-are-you-sure',
  templateUrl: './are-you-sure.component.html',
  styleUrls: ['./are-you-sure.component.sass'],
})
export class AreYouSureComponent {
  @Output() sureEmitter = new EventEmitter<boolean>();

  close() {
    this.sureEmitter.emit(false);
  }
  yes() {
    this.sureEmitter.emit(true);
  }
}
