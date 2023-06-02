import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appMarkdown]',
})
export class MarkdownDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
