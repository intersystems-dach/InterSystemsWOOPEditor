import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-page-nav-bar',
  templateUrl: './page-nav-bar.component.html',
  styleUrls: ['./page-nav-bar.component.sass'],
})
export class PageNavBarComponent {
  @Input() showNextButton: boolean = true;
  @Input() showPrevButton: boolean = true;
  @Input() showhintButton: boolean = true;
  @Input() showResultButton: boolean = true;

  @Output() showNextEmitter = new EventEmitter<string>();
  @Output() showPrevEmitter = new EventEmitter<string>();
  @Output() showhintEmitter = new EventEmitter<string>();
  @Output() showResultEmitter = new EventEmitter<string>();

  @HostListener('document:keydown.control.arrowright', ['$event'])
  showNext() {
    this.showNextEmitter.emit('showNext');
  }

  @HostListener('document:keydown.control.arrowleft', ['$event'])
  showPrev() {
    this.showPrevEmitter.emit('showPrev');
  }
  showhint() {
    this.showhintEmitter.emit('showhint');
  }
  showResult() {
    this.showResultEmitter.emit('showResult');
  }
  getDarkModeEnabled() {
    return AppComponent.darkModeEnabled;
  }
}
