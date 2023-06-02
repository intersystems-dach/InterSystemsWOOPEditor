import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as Prism from 'prismjs';

@Component({
  selector: 'app-code-window',
  templateUrl: './code-window.component.html',
  styleUrls: ['./code-window.component.sass'],
})
export class CodeWindowComponent {
  @Input() code: string = `
  // test
  ClassMethod ping() As %Stream.Object
  {
    Do ..%SetStatusCode(200)
    Quit {"status": true}.%ToJSON()
  }
  `;

  @Input() language: string = 'javascript';
  @Input() title: string = 'mycode';

  @ViewChild('codeEle') codeEle!: ElementRef;

  ngAfterViewInit() {
    Prism.highlightElement(this.codeEle.nativeElement);
  }

  ngOnChanges(changes: any): void {
    if (changes?.code) {
      if (this.codeEle?.nativeElement) {
        this.codeEle.nativeElement.textContent = this.code;
        Prism.highlightElement(this.codeEle.nativeElement);
      }
    }
  }
}
