import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-translate-spec',
  templateUrl: './translate-spec.component.html',
  styleUrls: ['./translate-spec.component.sass'],
})
export class TranslateSpecComponent {
  toLanguage: string = 'en';

  @Output() eventEmitter = new EventEmitter<string>();

  constructor(
    private localStorageService: LocalStorageService,
  ) {
    this.toLanguage = this.localStorageService.getLanguageTo();

  }

  submit() {
    this.localStorageService.setLanguageTo(this.toLanguage);
    this.eventEmitter.emit(this.toLanguage);
  }

  @HostListener('document:keydown.escape', ['$event'])
  close() {
    this.eventEmitter.emit('close');
  }
}
