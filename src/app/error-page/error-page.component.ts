import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.sass'],
})
export class ErrorPageComponent {
  constructor(private router: Router) {}

  goToServerSettings() {
    this.router.navigate(['/settings/server']);
  }
}
