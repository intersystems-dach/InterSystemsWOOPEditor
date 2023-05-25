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

  constructor(private mdService: MarkdownService, private http: HttpClient) {}

  async ngOnInit() {
    const markdownRaw = await this.http
      .get(this.url, { responseType: 'text' })
      .toPromise();

    if (markdownRaw === undefined) {
      console.error('Could not get markdown file!');
      return;
    }
    this.markdown = this.mdService.parse(markdownRaw);
  }
}
