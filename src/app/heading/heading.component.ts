import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],
})
export class HeadingComponent {
  @Input() heading: string = '';
  @Input() level: number = 1;

  constructor(private router: Router) {}

  onClick() {
    const headingurl = '~' + this.heading.toLowerCase().replace(/\s/g, '-');
    const base = this.router.url.split('~')[0];
    const newurl = base + headingurl;
    if (this.router.url === newurl) {
      this.router.navigate([base]);
      return;
    }
    this.router.navigate([newurl]);
  }
}
