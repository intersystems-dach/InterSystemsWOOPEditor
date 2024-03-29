import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { Page } from 'src/utils/classes';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { IrisinterfaceService } from 'src/app/services/irisinterface.service';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss'],
})
export class EditContentComponent {
  @Input() type: string = '';
  @Input() page!: Page;
  @Output() changeEmitter = new EventEmitter<Page>();

  data: string = '';
  dataBefore: string | undefined = undefined;
  focus = false;
  private slectionContent: string = '';
  private selectionStart: number = -1;
  private selectionEnd: number = -1;

  constructor(
    private localStorageService: LocalStorageService,
    private apiService: IrisinterfaceService
  ) {
    this.getData();
  }

  handleKeydown(event: any) {
    if (event.key == 'Tab') {
      event.preventDefault();
      var start = event.target.selectionStart;
      var end = event.target.selectionEnd;
      event.target.value =
        event.target.value.substring(0, start) +
        '\t' +
        event.target.value.substring(end);
      event.target.selectionStart = event.target.selectionEnd = start + 1;
      this.data = event.target.value;
      this.setData();
    }
  }

  ngOnInit() {
    this.getData();
  }

  onFocus() {
    this.focus = true;
  }

  onFocusOut() {
    this.focus = false;
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
    } else if (value.startsWith('![')) {
      this.addImage(value);
    } else if (value.startsWith('?[')) {
      this.addImage(value);
    } else if (value.startsWith('$$$[')) {
      this.addImage(value);
    } else if (value.startsWith('translate')) {
      this.translate(
        value.split(',')[1],
        value.includes('excludeCodeBlocks'),
        value.includes('translatePage')
      );
    }
    this.focus = oldFocus;
  }

  async translate(
    tolang: string = 'en',
    excludeCodeBlocks: boolean,
    translatePage: boolean
  ) {
    if (!translatePage) {
      this.data = await this.translateText(
        this.data,
        tolang,
        excludeCodeBlocks
      );
      this.setData();
    } else {
      this.page.Content = await this.translateText(
        this.page.Content,
        tolang,
        excludeCodeBlocks
      );
      this.page.Hint = await this.translateText(
        this.page.Hint,
        tolang,
        excludeCodeBlocks
      );
      this.page.Result = await this.translateText(
        this.page.Result,
        tolang,
        excludeCodeBlocks
      );

      this.changeEmitter.emit();
    }
  }

  async translateText(
    text: string,
    tolang: string = 'en',
    excludeCodeBlocks: boolean
  ): Promise<string> {
    let lines = text.split('\n');
    let newText = '';
    let inCodeBlock = false;
    for (let i = 0; i < lines.length; i++) {
      let l = lines[i];
      if (l.startsWith('![') || l.startsWith('?[')) {
        newText += l + '\n';
        continue;
      }
      if ((l.startsWith('```') || l.startsWith('~~~')) && excludeCodeBlocks) {
        inCodeBlock = !inCodeBlock;
        newText += l + '\n';
        continue;
      }
      if (inCodeBlock && excludeCodeBlocks) {
        newText += l + '\n';
        continue;
      }
      let translated = await this.apiService
        .translateText(l, tolang)
        .toPromise()
        .then((res) => {
          return res.text;
        });

      newText += translated + '\n';
    }
    return newText;
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

  addImage(value: string) {
    this.data += '\n' + value;
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

  @HostListener('document:keydown.control.z', ['$event'])
  setToDatBefore() {
    if (!this.focus || !this.dataBefore) return;
    this.data = this.dataBefore;
    this.dataBefore = undefined;
    this.setData();
  }

  getData() {
    if (this.type === 'content') this.data = this.page.Content;
    if (this.type === 'hint') this.data = this.page.Hint;
    if (this.type === 'result') this.data = this.page.Result;
  }

  setData() {
    this.dataBefore = this.data;
    //this.autoComplete();
    if (this.type === 'content') this.page.Content = this.data;
    if (this.type === 'hint') this.page.Hint = this.data;
    if (this.type === 'result') this.page.Result = this.data;
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
    return this.localStorageService.getFontSize();
  }

  getHeight() {
    let height = this.data.split('\n').length * this.getFontSize() * 2;
    if (height < 50) return 50;
    return height;
  }
}
