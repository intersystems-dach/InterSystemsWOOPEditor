import { Component } from '@angular/core';
import { VersionService } from '../services/version.service';

@Component({
  selector: 'app-whats-new',
  templateUrl: './whats-new.component.html',
  styleUrls: ['./whats-new.component.sass'],
})
export class WhatsNewComponent {
  constructor(private versionService: VersionService) {}

  goBack() {
    window.history.back();
  }

  getVersionManager() {
    return this.versionService;
  }
}
