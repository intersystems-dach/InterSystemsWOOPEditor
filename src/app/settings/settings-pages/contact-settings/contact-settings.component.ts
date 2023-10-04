import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-settings',
  templateUrl: './contact-settings.component.html',
  styleUrls: ['./contact-settings.component.sass', '../stylesheet.scss'],
})
export class ContactSettingsComponent {
  constructor(private router: Router) {}

  getHelp() {
    this.router.navigate(['help']);
  }
}
