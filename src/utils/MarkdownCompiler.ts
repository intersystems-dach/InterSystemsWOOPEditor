/* import { IrisinterfaceService } from 'src/app/services/irisinterface.service';

export default class MarkdownCompiler {
  static compileMarkdown(markdown: string): any[] {
    let lines = markdown.split('\n');
    let blocks: any[] = [];
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
      } else {
        let code = '';
        let inCodeBlock = false;
        while (
          i < lines.length &&
          !lines[i].startsWith('~~~') &&
          !lines[i].startsWith('![') &&
          !lines[i].startsWith('$$$[') &&
          !lines[i].startsWith('?[')
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
    return blocks;
  }

  static replaceHostAndPort(s: string): string {
    s = s.replace(/\$\$HOST\$\$/g, IrisinterfaceService.host);
    s = s.replace(/\$\$PORT\$\$/g, '' + IrisinterfaceService.port);
    return s;
  }
}
 */
