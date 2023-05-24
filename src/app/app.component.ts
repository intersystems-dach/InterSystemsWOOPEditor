import { Component, OnInit } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'InterSystemsWUI';

  markdown: string | undefined;

  constructor(private mdService: MarkdownService, private http: HttpClient) {}

  async ngOnInit() {
    const markdownRaw = await this.http
      .get('assets/chapters/test.md', { responseType: 'text' })
      .toPromise();

    if (markdownRaw === undefined) {
      console.log('markdownRaw is undefined');
      return;
    }
    this.markdown = this.mdService.parse(markdownRaw);
  }
}
