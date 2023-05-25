import { Component, Input } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-markdown-content',
  templateUrl: './markdown-content.component.html',
  styleUrls: ['./markdown-content.component.sass'],
})
export class MarkdownContentComponent {
  title = 'InterSystemsWOOP';

  @Input() url: string = '';

  markdown: string | undefined;
  line: string = '';

  constructor(private mdService: MarkdownService, private http: HttpClient) {}

  public static fontSize = 20;

  async ngOnInit() {
    const markdownRaw = await this.http
      .get(this.url, { responseType: 'text' })
      .toPromise();

    if (markdownRaw === undefined) {
      console.error('Could not get markdown file!');
      return;
    }
    this.markdown = this.mdService.parse(markdownRaw);
    let markDownLines = markdownRaw.split('\n');
    let opened = false;
    let openedIndex = 0;
    for (let i = 0; i < markDownLines.length; i++) {
      console.log(markDownLines[i]);
      if (markDownLines[i].includes('```') && !opened) {
        opened = true;
        openedIndex = i;
      } else if (markDownLines[i].includes('```') && opened) {
        opened = false;
        this.line += openedIndex + 2 + '-' + i + ', ';
      }
    }
    if (this.line.length > 0)
      this.line = this.line.substring(0, this.line.length - 2);
    console.log(this.line);
  }

  getFontSize() {
    return MarkdownContentComponent.fontSize;
  }
}
