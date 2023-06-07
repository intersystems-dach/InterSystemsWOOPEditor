import { Component } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-server-settings',
  templateUrl: './server-settings.component.html',
  styleUrls: ['./server-settings.component.sass', '../stylesheet.sass'],
})
export class ServerSettingsComponent {
  host: string = '';
  port: number = 0;

  constructor(private localStorageService: LocalStorageService) {
    this.host = localStorageService.getServerHost();
    this.port = localStorageService.getServerPort();
  }

  save() {
    console.log('' + this.host + ':' + this.port);
    this.localStorageService.setServerHost(this.host);
    this.localStorageService.setServerPort(this.port);
    window.location.href = '/';
  }
}
