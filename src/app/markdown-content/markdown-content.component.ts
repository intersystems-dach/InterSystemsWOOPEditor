import { Component, Input } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';
import { IrisinterfaceService } from '../services/irisinterface.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-markdown-content',
  templateUrl: './markdown-content.component.html',
  styleUrls: ['./markdown-content.component.scss'],
})
export class MarkdownContentComponent {
  @Input() data: string = '';

  markdown: string | undefined;

  blocks: any[] = [];

  constructor(
    private mdService: MarkdownService,
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private irisinterfaceService: IrisinterfaceService
  ) {}

  async ngOnInit() {
    let lines = this.data.split('\n');

    for (let i = 0; i < lines.length; i++) {
      lines[i] = this.replaceHostAndPort(lines[i]);

      if (lines[i].startsWith('~~~')) {
        // code window
        let language = lines[i].replace('~~~', '');

        let settings: string[] = [];
        if (language.includes('{')) {
          let settingString = language.split('{')[1];
          language = language.split('{')[0];
          if (settingString.includes('}')) {
            settingString = settingString.split('}')[0];
          }
          settings = settingString.split(',');
        }

        let title = language;
        if (language.toLowerCase() == 'objectscript') {
          language = 'javascript';
          title = 'objectscript';
        }
        let code = '';
        i++;
        while (!lines[i].startsWith('~~~') && i < lines.length) {
          lines[i] = this.replaceHostAndPort(lines[i]);
          code += lines[i] + '\n';
          i++;
        }
        code = '\n' + code;
        this.blocks.push({
          type: 'codeblock',
          code: code,
          language: language,
          title: title,
          settings: settings,
        });
      } else if (lines[i].startsWith('![') || lines[i].startsWith('?[')) {
        //image
        let name = lines[i].split('[')[1].split(']')[0];
        let url = lines[i].split('(')[1].split(')')[0];
        let style = '';
        if (lines[i].split(')')[1].includes('{')) {
          style = lines[i].split('{')[1].split('}')[0];
        }
        if (lines[i].startsWith('?[')) {
          let urlToImage =
            'http://' +
            IrisinterfaceService.host +
            ':' +
            IrisinterfaceService.port +
            '/woop/image/get/' +
            url;
          let newURL = await this.http
            .get(urlToImage, { responseType: 'text' })
            .toPromise()
            .then((res) => {
              return res;
            });
          if (newURL != undefined) {
            url = newURL;
          } else {
            console.log('error getting image');
          }
        }
        this.blocks.push({
          type: 'image',
          code: url,
          language: style,
          title: name,
        });
      } else if (lines[i].startsWith('$$$[')) {
        //image
        let name = lines[i].split('[')[1].split(']')[0];
        let url = lines[i].split('(')[1].split(')')[0];
        /* url =
          'http://' +
          IrisinterfaceService.host +
          ':' +
          IrisinterfaceService.port +
          '/woop/file/get/' +
          url; */
        this.blocks.push({
          type: 'file',
          code: url,
          language: '',
          title: name,
        });
      } else if (lines[i].trim().startsWith('#')) {
        let heading = lines[i].replace(/#/g, '').trim();
        let level = lines[i].split(' ')[0].length;
        let id = heading.toLowerCase().replace(/ /g, '-');
        this.blocks.push({
          type: 'heading',
          code: heading,
          language: id,
          title: level,
        });
      } else {
        let code = '';
        let inCodeBlock = false;
        while (
          i < lines.length &&
          !lines[i].startsWith('~~~') &&
          !lines[i].startsWith('![') &&
          !lines[i].startsWith('$$$[') &&
          !lines[i].startsWith('?[') &&
          !lines[i].trim().startsWith('#')
        ) {
          if (lines[i].startsWith('```')) {
            inCodeBlock = !inCodeBlock;
          }

          if (!inCodeBlock && lines[i].startsWith('//')) {
            i++;
            continue;
          }
          lines[i] = this.replaceHostAndPort(lines[i]);

          code += lines[i] + '\n';
          i++;
        }
        this.blocks.push({
          type: 'textblock',
          code: this.mdService.parse(code),
          language: '',
          title: '',
        });
        if (i != lines.length) i--;
      }
    }
  }

  replaceHostAndPort(s: string): string {
    s = s.replace(/\$\$HOST\$\$/g, IrisinterfaceService.host);
    s = s.replace(/\$\$PORT\$\$/g, '' + IrisinterfaceService.port);
    return s;
  }

  getFontSize() {
    return this.localStorageService.getFontSize();
  }

  downloadFile(fileName: string) {
    this.irisinterfaceService.getFile(fileName).subscribe({
      next: (res: any) => {
        const link = document.createElement('a');
        link.href =
          'data:text/plain;charset=utf-8,' + encodeURIComponent(res.content);
        link.download = res.name;
        link.click();
      },
      error: (err) => {
        NotificationComponent.showNotification(
          'ERROR',
          'Error getting file: ' + err.message + '!',
          -1,
          true
        );
      },
    });
  }
}
