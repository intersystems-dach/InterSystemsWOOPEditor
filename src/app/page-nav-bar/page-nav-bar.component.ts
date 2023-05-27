import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-page-nav-bar',
  templateUrl: './page-nav-bar.component.html',
  styleUrls: ['./page-nav-bar.component.sass'],
})
export class PageNavBarComponent {
  @Input() showNextButton: boolean = true;
  @Input() showPrevButton: boolean = true;
  @Input() showTipButton: boolean = true;
  @Input() showResultButton: boolean = true;

  @Output() showNextEmitter = new EventEmitter<string>();
  @Output() showPrevEmitter = new EventEmitter<string>();
  @Output() showTipEmitter = new EventEmitter<string>();
  @Output() showResultEmitter = new EventEmitter<string>();

  @HostListener('document:keydown.control.arrowright', ['$event'])
  showNext() {
    this.showNextEmitter.emit('showNext');
  }

  @HostListener('document:keydown.control.arrowleft', ['$event'])
  showPrev() {
    this.showPrevEmitter.emit('showPrev');
  }
  showTip() {
    this.showTipEmitter.emit('showTip');
  }
  showResult() {
    this.showResultEmitter.emit('showResult');
  }
}
