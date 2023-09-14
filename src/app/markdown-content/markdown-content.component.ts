import { Component, Input } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';
import { IrisinterfaceService } from '../services/irisinterface.service';

@Component({
  selector: 'app-markdown-content',
  templateUrl: './markdown-content.component.html',
  styleUrls: ['./markdown-content.component.sass'],
})
export class MarkdownContentComponent {
  @Input() data: string = '';

  markdown: string | undefined;

  blocks: any[] = [];

  constructor(
    private mdService: MarkdownService,
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  async ngOnInit() {
    let lines = this.data.split('\n');

    for (let i = 0; i < lines.length; i++) {
      console.log(lines[i]);
      if (lines[i].startsWith('~~~')) {
        // code window
        let language = lines[i].replace('~~~', '');
        let title = language;
        if (language.toLowerCase() == 'objectscript') {
          language = 'javascript';
          title = 'objectscript';
        }
        let code = '';
        i++;
        while (!lines[i].startsWith('~~~') && i < lines.length) {
          code += lines[i] + '\n';
          i++;
        }
        code = '\n' + code;
        /* let codeblock =
          '<app-code-window [code]="\'\\n' +
          code +
          '\'" language="' +
          language +
          '" title="' +
          language +
          '"></app-code-window>'; */
        this.blocks.push({
          type: 'codeblock',
          code: code,
          language: language,
          title: title,
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
      } else {
        let code = '';
        while (
          i < lines.length &&
          !lines[i].startsWith('~~~') &&
          !lines[i].startsWith('![') &&
          !lines[i].startsWith('?[')
        ) {
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

    /*
```javascript
let i = 0
i++
let z = 3
z++
```
*/

    // https://stackoverflow.com/questions/48879695/load-component-via-innerhtml-in-angular5

    /* this.markdown = this.mdService.parse(x);
    for (let codeblock of codeblocks) {
      this.markdown += codeblock;
    }
    console.log(this.markdown); */
  }

  /* private addComponent(template: any) {
    @Component({ template })
    class TemplateComponent {}

    @NgModule({ declarations: [TemplateComponent] })
    class TemplateModule {}

    const mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
    const factory = mod.componentFactories.find(
      (comp) => comp.componentType === TemplateComponent
    );
    if (!factory) {
      throw new Error('No factory found');
    }
    const component = this.container.createComponent(factory);
    Object.assign(component.instance);
    // If properties are changed at a later stage, the change detection
    // may need to be triggered manually:
    // component.changeDetectorRef.detectChanges();
  } */

  /* loadComponent(language, code) {
    const viewContainerRef = this.appMarkdown.viewContainerRef;
    viewContainerRef.clear();

    const componentRef =
      viewContainerRef.createComponent<CodeWindowComponent>();
    componentRef.instance.data = adItem.data;
  } */

  getFontSize() {
    return this.localStorageService.getFontSize();
  }
}
