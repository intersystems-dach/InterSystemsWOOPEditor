import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-translate-spec',
  templateUrl: './translate-spec.component.html',
  styleUrls: ['./translate-spec.component.scss'],
})
export class TranslateSpecComponent {
  toLanguage: string = 'en';

  excludeCodeBlocks: boolean = true;
  translatePage: boolean = false;

  @Output() eventEmitter = new EventEmitter<string>();

  constructor(
    private localStorageService: LocalStorageService,
  ) {
    this.toLanguage = this.localStorageService.getLanguageTo();

  }

  submit() {
    this.localStorageService.setLanguageTo(this.toLanguage);
    let x = this.toLanguage;
    if (this.excludeCodeBlocks) {
      x += ',excludeCodeBlocks';
    }
    if (this.translatePage) {
      x += ',translatePage';
    }
    this.eventEmitter.emit(x);
    this.translatePage = false;
    this.excludeCodeBlocks = true;
  }

  @HostListener('document:keydown.escape', ['$event'])
  close() {
    this.eventEmitter.emit('close');
  }
}
