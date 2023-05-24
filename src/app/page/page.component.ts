import { Component, Input } from '@angular/core';
import { Page } from 'src/utils/classes';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.sass'],
})
export class PageComponent {
  @Input() page!: Page;
  @Input() show: boolean = false;
  @Input() showTip: boolean = false;
  @Input() showResult: boolean = false;
}
