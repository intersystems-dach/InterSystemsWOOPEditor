import { Component } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-storage-settings',
  templateUrl: './storage-settings.component.html',
  styleUrls: ['./storage-settings.component.sass', '../stylesheet.sass'],
})
export class StorageSettingsComponent {
  constructor(private localStorageService: LocalStorageService) {}

  clearStorage() {
    this.localStorageService.clearAll();
    alert('Storage cleared!');
  }

  getRememberPage(): boolean {
    return this.localStorageService.rememberPage;
  }

  toggleRememberPage() {
    this.localStorageService.setRememberPage(
      !this.localStorageService.rememberPage
    );
  }
}
