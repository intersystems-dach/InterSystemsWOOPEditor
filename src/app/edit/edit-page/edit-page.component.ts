import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Page } from 'src/utils/classes';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.sass'],
})
export class EditPageComponent {
  @Input() page!: Page;
  @Input() show: boolean = false;
  @Input() showTip: boolean = false;
  @Input() showResult: boolean = false;

  @Output() changeEmitter = new EventEmitter<Page>();

  onChange() {
    this.changeEmitter.emit();
  }
}