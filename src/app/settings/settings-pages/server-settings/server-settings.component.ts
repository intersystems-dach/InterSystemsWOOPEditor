import { Component } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { IrisinterfaceService } from '../../../services/irisinterface.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-settings',
  templateUrl: './server-settings.component.html',
  styleUrls: ['./server-settings.component.sass', '../stylesheet.scss'],
})
export class ServerSettingsComponent {
  connection: string = '';
  name: string = '';
  host: string = '';
  port: number = 0;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.host = localStorageService.getServerHost();
    this.port = localStorageService.getServerPort();
  }

  connect() {
    this.localStorageService.setServerHost(this.host);
    this.localStorageService.setServerPort(this.port);
    this.router.navigate(['/']);
  }

  removeConnection() {
    this.localStorageService.removeServerConnection(this.connection);
    this.connection = '';
    this.openConnection();
  }

  saveConnection() {
    if (this.name === '') {
      alert('Name is empty!');
      return;
    }

    this.localStorageService.addServerConnection(
      this.name,
      this.host,
      this.port
    );
    alert('Connection saved!');
  }

  openConnection() {
    if (this.connection === '') {
      this.name = '';
      this.host = this.localStorageService.getServerHost();
      this.port = this.localStorageService.getServerPort();
      return;
    }
    const con = this.localStorageService.getConnection(this.connection);
    if (con) {
      this.name = con.name;
      this.host = con.host;
      this.port = con.port;
    }
  }

  getConnections(): any[] {
    return this.localStorageService.getAllServerConnections();
  }

  isCurrentConnection(): boolean {
    return (
      this.localStorageService.getServerHost() === this.host &&
      this.localStorageService.getServerPort() === this.port
    );
  }

  getCurrentConnection(): string {
    return IrisinterfaceService.host + ':' + IrisinterfaceService.port;
  }
}
