import { Component, Input } from '@angular/core';
import { Chapter, UserManger, VerifyCache } from 'src/utils/classes';
import { MarkdownService } from 'ngx-markdown';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
/* const { mdToPdf } = require('md-to-pdf'); */

import pdfMake from 'pdfmake/build/pdfmake';

import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

import htmlToPdfmake from 'html-to-pdfmake';
import { ChaptermanagerService } from '../services/chaptermanager.service';
@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.sass'],
})
export class ChapterComponent {
  @Input() chapter!: Chapter;
  @Input() currentPage: number = 0;

  chapterName: string = '';
  hintVisible: boolean = false;
  resultVisible: boolean = false;
  exportOptionsVisible = false;
  contentVisible = false;

  constructor(
    private mdService: MarkdownService,
    private router: Router,
    private route: ActivatedRoute,
    private chapterManger: ChaptermanagerService
  ) {}

  ngOnInit(): void {
    let x = this.route.snapshot.paramMap.get('chapterName');
    if (x == null) {
      this.router.navigate(['/']);
      return;
    }
    this.chapterName = x;
    this.chapterManger.init().then(() => {
      this.chapter = this.chapterManger.getChapterByName(
        this.chapterName,
        true
      );
      if (!this.chapter.IsPrivate) {
        if (
          UserManger.userLevel == 2 ||
          (UserManger.userLevel == 1 &&
            this.chapter.Author == UserManger.userName)
        ) {
          VerifyCache.verifyChapter(this.chapter.Title);
        }

        this.contentVisible = VerifyCache.isChapterVerified(this.chapter.Title);
      } else {
        if (
          UserManger.userLevel == 2 ||
          (UserManger.userLevel == 1 &&
            this.chapter.Author == UserManger.userName)
        ) {
          this.contentVisible = true;
        } else {
          this.router.navigate(['/login']);
        }
      }
    });
  }
  verifyChapter(event: boolean) {
    if (event) {
      VerifyCache.verifyChapter(this.chapter.Title);
      this.contentVisible = true;
    } else {
      this.router.navigate(['/']);
    }
  }
  showNextPage(): void {
    if (this.currentPage == this.chapter.Pages.length - 1) {
      return;
    }
    this.currentPage++;
    this.hintVisible = false;
    this.resultVisible = false;
    window.scrollTo({ top: 0 });
  }

  showPrevPage(): void {
    if (this.currentPage == 0) {
      return;
    }
    this.currentPage--;
    this.hintVisible = false;
    this.resultVisible = false;
    window.scrollTo({ top: 0 });
  }

  showhint() {
    this.hintVisible = true;
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
    let includehint = event.includes('hint');
    let includeResult = event.includes('result');

    let content = '# ' + this.chapter.Title + '\n---\n';
    for (let page of this.chapter.Pages) {
      content += page.Content + '\n---\n';
      if (page.Hint != '' && includehint) {
        content += '## HINT\n\n' + page.Hint + '\n---\n';
      }
      if (page.Result != '' && includeResult) {
        content += '## RESULT\n\n' + page.Result + '\n---\n';
      }
      content += '\n\n';
    }
    if (asPDf) {
      /* let pdf = await mdToPdf(
      { content: content },
      { dest: 'path/to/output.pdf' }
    ); */
      let html = this.mdService.parse(content);
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
      a.download = this.chapter.Title + '.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
