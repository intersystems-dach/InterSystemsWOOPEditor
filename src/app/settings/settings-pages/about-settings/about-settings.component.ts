import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MetaDataService } from '../../../services/meta-data.service';

@Component({
  selector: 'app-about-settings',
  templateUrl: './about-settings.component.html',
  styleUrls: ['./about-settings.component.sass', '../stylesheet.scss'],
})
export class AboutSettingsComponent {
  constructor(
    private router: Router,
    private metaDataService: MetaDataService
  ) {}

  getHelp() {
    this.router.navigate(['help']);
  }

  whatsNew() {
    this.router.navigate(['info']);
  }

  getVersion() {
    return this.metaDataService.version;
  }

  goToImpressum() {
    this.router.navigate(['impressum']);
  }
}
