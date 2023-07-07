import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-markdown-cheat-sheet',
  templateUrl: './markdown-cheat-sheet.component.html',
  styleUrls: ['./markdown-cheat-sheet.component.sass'],
})
export class MarkdownCheatSheetComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']);
  }
}
