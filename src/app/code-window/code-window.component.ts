import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as Prism from 'prismjs';
import { ColorSchemeService } from '../services/color-scheme.service';
import { UserManger } from 'src/utils/classes';

@Component({
  selector: 'app-code-window',
  templateUrl: './code-window.component.html',
  styleUrls: ['./code-window.component.scss'],
})
export class CodeWindowComponent {
  @Input() code: string = '';

  @Input() language: string = 'javascript';
  @Input() title: string = 'mycode';
  @Input() copyable: boolean = false;

  @ViewChild('codeEle') codeEle!: ElementRef;

  copied: boolean = false;
  db = false;

  constructor(private colorSchemeService: ColorSchemeService) {}

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

  toggleCopyable() {
    if (UserManger.userLevel == 0) {
      return;
    }
    this.copyable = !this.copyable;
  }

  getDarkModeEnabled() {
    return this.colorSchemeService.darkModeEnabled;
  }

  copyCode() {
    const el = document.createElement('textarea');
    el.value = this.code;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 1000);
  }

  onDblClick() {
    this.db = !this.db;
  }
}
