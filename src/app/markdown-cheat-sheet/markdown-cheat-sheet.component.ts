import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-markdown-cheat-sheet',
  templateUrl: './markdown-cheat-sheet.component.html',
  styleUrls: ['./markdown-cheat-sheet.component.scss'],
})
export class MarkdownCheatSheetComponent {
  constructor(private router: Router) {}

  goBack() {
    // go to the previous page
    this.router.navigate(['/']);
  }

  goToPlayground() {
    // go to the previous page
    this.router.navigate(['/playground']);
  }
}
