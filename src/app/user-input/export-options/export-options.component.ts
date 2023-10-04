import {
  Component,
  Input,
  EventEmitter,
  Output,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-export-options',
  templateUrl: './export-options.component.html',
  styleUrls: ['./export-options.component.scss'],
})
export class ExportOptionsComponent {
  asPdf: boolean = true;
  asMarkdown: boolean = false;
  includehint: boolean = true;
  includeResult: boolean = true;

  @Output() closeEmitter = new EventEmitter<string>();

  export() {
    let msg = this.asMarkdown ? 'md' : 'pdf';
    if (this.includehint) {
      msg += 'hint';
    }
    if (this.includeResult) {
      msg += 'result';
    }
    this.closeEmitter.emit(msg);
    this.asPdf = true;
    this.asMarkdown = false;
    this.includehint = true;
    this.includeResult = true;
  }

  setPDF() {
    this.asMarkdown = !this.asPdf;
  }

  setMarkdown() {
    this.asPdf = !this.asMarkdown;
  }

  @HostListener('document:keydown.escape', ['$event'])
  close() {
    this.closeEmitter.emit('close');
    this.asPdf = true;
    this.asMarkdown = false;
    this.includehint = true;
    this.includeResult = true;
  }
}
