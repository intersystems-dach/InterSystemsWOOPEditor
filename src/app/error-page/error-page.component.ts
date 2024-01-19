import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IrisinterfaceService } from '../services/irisinterface.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent {
  isServerOnline = false;

  constructor(
    private router: Router,
    private apiService: IrisinterfaceService
  ) {}

  ngOnInit(): void {
    this.checkIfServerOnline();
    const interval = setInterval(() => {
      this.checkIfServerOnline();
      if (this.isServerOnline && this.router.url == '/error') {
        this.router.navigate(['/']);
        clearInterval(interval);
      }
    }, 1000);
  }

  checkIfServerOnline() {
    this.apiService.isServerOnline().subscribe({
      next: (data: any) => {
        this.isServerOnline = true;
      },
      error: (err) => {
        this.isServerOnline = false;
      },
    });
  }

  goToServerSettings() {
    this.router.navigate(['/settings/server']);
  }
}
