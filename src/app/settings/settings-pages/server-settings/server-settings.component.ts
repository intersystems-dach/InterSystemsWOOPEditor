import { Component } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { IrisinterfaceService } from '../../../services/irisinterface.service';
import { Router } from '@angular/router';
import { NotificationComponent } from 'src/app/notification/notification.component';

@Component({
  selector: 'app-server-settings',
  templateUrl: './server-settings.component.html',
  styleUrls: ['./server-settings.component.sass', '../stylesheet.scss'],
})
export class ServerSettingsComponent {
  connection: string = '';
  protocol: string = '';
  name: string = '';
  host: string = '';
  port: number = 0;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.host = localStorageService.getServerHost();
    this.port = localStorageService.getServerPort();
    this.protocol = localStorageService.getServerProtocol();
  }

  connect() {
    this.localStorageService.setServerHost(this.host);
    this.localStorageService.setServerPort(this.port);
    this.localStorageService.setServerProtocol(this.protocol);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    this.router.navigate(['/']);
  }

  removeConnection() {
    this.localStorageService.removeServerConnection(this.connection);
    this.connection = '';
    this.openConnection();
  }

  saveConnection() {
    if (this.name === '') {
      NotificationComponent.showNotification(
        'Error',
        'Please enter a name for the connection!',
        -1,
        true
      );
      return;
    }

    if (this.port < 0) {
      this.port = this.protocol === 'https' ? 443 : 80;
    }

    this.localStorageService.addServerConnection(
      this.name,
      this.host,
      this.port,
      this.protocol
    );
    NotificationComponent.showNotification('Success', 'Connection saved!');
  }

  openConnection() {
    if (this.connection === '') {
      this.name = '';
      this.host = this.localStorageService.getServerHost();
      this.port = this.localStorageService.getServerPort();
      this.protocol = this.localStorageService.getServerProtocol();
      return;
    }
    const con = this.localStorageService.getConnection(this.connection);
    if (con) {
      this.name = con.name;
      this.host = con.host;
      this.port = con.port;
      this.protocol = con.protocol;
    }
  }

  getConnections(): any[] {
    return this.localStorageService.getAllServerConnections();
  }

  isCurrentConnection(): boolean {
    return (
      IrisinterfaceService.host === this.host &&
      IrisinterfaceService.port === this.port &&
      IrisinterfaceService.protocol === this.protocol
    );
  }

  getCurrentConnection(): string {
    return (
      IrisinterfaceService.protocol +
      '://' +
      IrisinterfaceService.host +
      ':' +
      IrisinterfaceService.port
    );
  }
}
