import { Component } from '@angular/core';
import { MetaDataService } from '../services/meta-data.service';

@Component({
  selector: 'app-whats-new',
  templateUrl: './whats-new.component.html',
  styleUrls: ['./whats-new.component.scss'],
})
export class WhatsNewComponent {
  constructor(private metaDataService: MetaDataService) {}

  goBack() {
    window.history.back();
  }

  getVersion() {
    return this.metaDataService.version;
  }
  getRealeseDate() {
    return this.metaDataService.date;
  }
  getReleaseNotes() {
    return this.metaDataService.notes;
  }
}
