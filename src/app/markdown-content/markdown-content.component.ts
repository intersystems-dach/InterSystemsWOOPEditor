import { Component, Input } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-markdown-content',
  templateUrl: './markdown-content.component.html',
  styleUrls: ['./markdown-content.component.sass'],
})
export class MarkdownContentComponent {
  @Input() data: string = '';

  markdown: string | undefined;
  line: string = '';

  constructor(private mdService: MarkdownService, private http: HttpClient) {}

  public static fontSize = 16;

  async ngOnInit() {
    let lines = this.data.split('\n');
    let codeblocks = [];
    let x = '';
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('```')) {
        let language = lines[i].replace('```', '');
        let code = '';
        i++;
        while (!lines[i].startsWith('```')) {
          code += lines[i] + '\\n';
          i++;
        }
        let codeblock =
          '<app-code-window [code]="\'\\n' +
          code +
          '\'" language="' +
          language +
          '" title="' +
          language +
          '"></app-code-window>';
        codeblocks.push(codeblock);
      } else {
        x += lines[i] + '\n';
      }
    }

    /*
```javascript
let i = 0
i++
let z = 3
z++
```
*/

    this.markdown = this.mdService.parse(x);
    for (let codeblock of codeblocks) {
      this.markdown += codeblock;
    }
    console.log(this.markdown);
  }

  getFontSize() {
    return MarkdownContentComponent.fontSize;
  }
}
