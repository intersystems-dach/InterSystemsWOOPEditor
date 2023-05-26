import { Component, Input } from '@angular/core';
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
    if (this.type === 'content') this.page.content = this.data;
    if (this.type === 'tip') this.page.tip = this.data;
    if (this.type === 'result') this.page.result = this.data;
  }

  getFontSize() {
    return MarkdownContentComponent.fontSize;
  }
}
