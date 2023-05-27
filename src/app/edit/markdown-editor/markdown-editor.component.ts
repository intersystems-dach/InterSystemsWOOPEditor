import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.sass'],
})
export class MarkdownEditorComponent {
  @Output() eventEmitter = new EventEmitter<string>();

  emit(value: string) {
    this.eventEmitter.emit(value);
  }
}
