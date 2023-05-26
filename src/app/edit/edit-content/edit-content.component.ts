import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  ngOnInit() {
    this.getData();
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
