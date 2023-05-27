import { Component, Input } from '@angular/core';
import { Chapter } from 'src/utils/classes';
import { MarkdownService } from 'ngx-markdown';
/* const { mdToPdf } = require('md-to-pdf'); */

import pdfMake from 'pdfmake/build/pdfmake';

import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

import htmlToPdfmake from 'html-to-pdfmake';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.sass'],
})
export class ChapterComponent {
  @Input() chapter!: Chapter;
  @Input() currentPage: number = 0;

  tipVisible: boolean = false;
  resultVisible: boolean = false;
  exportOptionsVisible = false;
  constructor(private mdService: MarkdownService) {}

  showNextPage(): void {
    if (this.currentPage == this.chapter.pages.length - 1) {
      return;
    }
    this.currentPage++;
    this.tipVisible = false;
    this.resultVisible = false;
    window.scrollTo({ top: 0 });
  }

  showPrevPage(): void {
    if (this.currentPage == 0) {
      return;
    }
    this.currentPage--;
    this.tipVisible = false;
    this.resultVisible = false;
    window.scrollTo({ top: 0 });
  }

  showTip() {
    this.tipVisible = true;
  }

  showResult() {
    this.resultVisible = true;
  }

  export(event: string) {
    this.exportOptionsVisible = !this.exportOptionsVisible;
    if (event == 'close') {
      return;
    }
    let asPDf = event.includes('pdf');
    let includeTip = event.includes('tip');
    let includeResult = event.includes('result');

    let content = '# ' + this.chapter.title + '\n---\n';
    for (let page of this.chapter.pages) {
      content += page.content + '\n---\n';
      if (page.tip != '' && includeTip) {
        content += '## TIP\n\n' + page.tip + '\n---\n';
      }
      if (page.result != '' && includeResult) {
        content += '## RESULT\n\n' + page.result + '\n---\n';
      }
      content += '\n\n';
    }
    if (asPDf) {
      /* let pdf = await mdToPdf(
      { content: content },
      { dest: 'path/to/output.pdf' }
    ); */
      let html = this.mdService.parse(content);
      console.log(html);
      /* let logo =
      '<img src="assets/imgs/InterSystemsWOOPLogo.png" width="100" height="100" />';
    html = logo + html; */
      let pdfContent = htmlToPdfmake(html);

      const documentDefinition = { content: pdfContent };

      pdfMake.createPdf(documentDefinition).open();
    } else {
      let blob = new Blob([content], { type: 'text/markdown' });
      let url = URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = url;
      a.download = this.chapter.title + '.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  goBack() {
    AppComponent.goBack();
  }
}
