import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { MarkdownContentComponent } from '../../markdown-content/markdown-content.component';
import { Page } from 'src/utils/classes';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.sass'],
})
export class EditContentComponent {
  @Input() type: string = '';
  @Input() page!: Page;
  @Output() changeEmitter = new EventEmitter<Page>();
  data: string = '';
  focus = false;
  private slectionContent: string = '';
  private selectionStart: number = -1;
  private selectionEnd: number = -1;

  ngOnInit() {
    this.getData();
  }

  onFocus() {
    this.focus = true;
    console.log('focus in');
  }

  onFocusOut() {
    this.focus = false;
    console.log('focus out');
  }

  selectionchange(event: any) {
    this.selectionStart = event.target.selectionStart;
    this.selectionEnd = event.target.selectionEnd;
    this.slectionContent = event.target.value.substr(
      this.selectionStart,
      this.selectionEnd - this.selectionStart
    );
  }

  onEditorInput(value: string) {
    let oldFocus = this.focus;
    this.focus = true;
    if (value === 'bold') {
      this.bold();
    } else if (value === 'italic') {
      this.italic();
    } else if (value === 'code') {
      this.code();
    }
    this.focus = oldFocus;
  }

  @HostListener('document:keydown.shift.alt.arrowup', ['$event'])
  copyLineUp() {
    if (!this.focus) return;

    let lines = this.data.split('\n');
    let characterCount = 0;
    let copylines = [];
    let start = -1;
    for (let i = 0; i < lines.length; i++) {
      characterCount += lines[i].length + 1;
      if (characterCount > this.selectionStart) {
        copylines.push(lines[i]);
        start = i;
      } else if (copylines.length > 0) {
        copylines.push(lines[i]);
      }
      if (characterCount > this.selectionEnd) {
        lines.splice(start - 1, 0, copylines.join('\n'));
        break;
      }
    }
    this.data = lines.join('\n');
    this.setData();
  }

  @HostListener('document:keydown.shift.alt.arrowdown', ['$event'])
  copyLineDown() {
    if (!this.focus) return;

    let lines = this.data.split('\n');
    let characterCount = 0;
    let copylines = [];
    let start = -1;
    for (let i = 0; i < lines.length; i++) {
      characterCount += lines[i].length + 1;
      if (characterCount > this.selectionStart) {
        copylines.push(lines[i]);
        start = i;
      } else if (copylines.length > 0) {
        copylines.push(lines[i]);
      }
      if (characterCount > this.selectionEnd) {
        lines.splice(i + 1, 0, copylines.join('\n'));
        break;
      }
    }
    this.data = lines.join('\n');
    this.setData();
  }

  @HostListener('document:keydown.control.alt.b', ['$event'])
  bold() {
    if (!this.focus) return;

    this.data =
      this.data.substr(0, this.selectionStart) +
      '**' +
      this.slectionContent +
      '**' +
      this.data.substr(this.selectionEnd);
    this.setData();
  }

  @HostListener('document:keydown.control.alt.i', ['$event'])
  italic() {
    if (!this.focus) return;

    this.data =
      this.data.substr(0, this.selectionStart) +
      '_' +
      this.slectionContent +
      '_' +
      this.data.substr(this.selectionEnd);
    this.setData();
  }

  @HostListener('document:keydown.control.alt.c', ['$event'])
  code() {
    if (!this.focus) return;

    this.data =
      this.data.substr(0, this.selectionStart) +
      '`' +
      this.slectionContent +
      '`' +
      this.data.substr(this.selectionEnd);
    this.setData();
  }

  getData() {
    if (this.type === 'content') this.data = this.page.content;
    if (this.type === 'tip') this.data = this.page.tip;
    if (this.type === 'result') this.data = this.page.result;
  }

  setData() {
    //this.autoComplete();
    if (this.type === 'content') this.page.content = this.data;
    if (this.type === 'tip') this.page.tip = this.data;
    if (this.type === 'result') this.page.result = this.data;
    this.changeEmitter.emit();
  }

  autoComplete() {
    //get last character
    let lastChar = this.data[this.data.length - 1];
    if (lastChar === '[') {
      this.data += ']';
    }
    if (lastChar === '(') {
      this.data += ')';
    }
    if (lastChar === '"') {
      this.data += '"';
    }
    if (lastChar === "'") {
      this.data += "'";
    }
    if (lastChar === '{') {
      this.data += '}';
    }
    if (lastChar === '_') {
      this.data += '_';
    }
    if (lastChar === '*') {
      this.data += '*';
    }
    if (lastChar === '`') {
      this.data += '`';
    }
  }

  getFontSize() {
    return MarkdownContentComponent.fontSize;
  }

  getHeight() {
    let height = this.data.split('\n').length * this.getFontSize() * 1.2;
    if (height < 50) return 50;
    return height;
  }
}
