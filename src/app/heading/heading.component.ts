import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.sass'],
})
export class HeadingComponent {
  @Input() heading: string = '';
  @Input() level: number = 1;
}
