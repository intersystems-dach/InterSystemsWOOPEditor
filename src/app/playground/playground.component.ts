import {
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
})
export class PlaygroundComponent {
  data: string = '# Playground';

  @ViewChild('outlet', { read: ViewContainerRef }) outletRef:
    | ViewContainerRef
    | undefined;
  @ViewChild('content', { read: TemplateRef }) contentRef:
    | TemplateRef<any>
    | undefined;

  rerender() {
    if (!this.outletRef || !this.contentRef) return;
    this.outletRef.clear();
    this.outletRef.createEmbeddedView(this.contentRef);
  }

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  handleKeydown(event: any) {
    if (event.key == 'Tab') {
      event.preventDefault();
      var start = event.target.selectionStart;
      var end = event.target.selectionEnd;
      event.target.value =
        event.target.value.substring(0, start) +
        '\t' +
        event.target.value.substring(end);
      event.target.selectionStart = event.target.selectionEnd = start + 1;
      this.data = event.target.value;
    }
  }

  onChange() {
    console.log(this.data);
    this.rerender();
  }

  getData() {
    return this.data;
  }

  getHeight() {
    let height = this.data.split('\n').length * this.getFontSize() * 2;
    if (height < 50) return 50;
    return height;
  }

  getFontSize() {
    return this.localStorageService.getFontSize();
  }

  goBack() {
    // go to the previous page
    this.router.navigate(['/markdown']);
  }
}
