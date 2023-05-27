import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-export-options',
  templateUrl: './export-options.component.html',
  styleUrls: ['./export-options.component.sass'],
})
export class ExportOptionsComponent {
  asPdf: boolean = true;
  asMarkdown: boolean = false;
  includeTip: boolean = true;
  includeResult: boolean = true;

  @Output() closeEmitter = new EventEmitter<string>();

  export() {
    let msg = this.asMarkdown ? 'md' : 'pdf';
    if (this.includeTip) {
      msg += 'tip';
    }
    if (this.includeResult) {
      msg += 'result';
    }
    this.closeEmitter.emit(msg);
    this.asPdf = true;
    this.asMarkdown = false;
    this.includeTip = true;
    this.includeResult = true;
  }

  setPDF() {
    this.asMarkdown = !this.asPdf;
  }

  setMarkdown() {
    this.asPdf = !this.asMarkdown;
  }
  close() {
    this.closeEmitter.emit('close');
    this.asPdf = true;
    this.asMarkdown = false;
    this.includeTip = true;
    this.includeResult = true;
  }
}
