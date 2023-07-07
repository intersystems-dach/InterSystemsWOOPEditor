import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VersionService } from 'src/app/services/version.service';

@Component({
  selector: 'app-about-settings',
  templateUrl: './about-settings.component.html',
  styleUrls: ['./about-settings.component.sass', '../stylesheet.sass'],
})
export class AboutSettingsComponent {
  constructor(private router: Router, private versionService: VersionService) {}

  getHelp() {
    this.router.navigate(['help']);
  }

  whatsNew() {
    this.router.navigate(['whats-new']);
  }

  getVersion() {
    return this.versionService;
  }
}
