import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IrisinterfaceService } from '../services/irisinterface.service';

@Component({
  selector: 'app-connect-via-url',
  templateUrl: './connect-via-url.component.html',
  styleUrls: ['./connect-via-url.component.sass'],
})
export class ConnectViaUrlComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    let protocol = this.route.snapshot.paramMap.get('protocol');
    if (protocol == null) {
      this.router.navigate(['/']);
      return;
    }

    let host = this.route.snapshot.paramMap.get('host');
    if (host == null) {
      this.router.navigate(['/']);
      return;
    }

    let portS = this.route.snapshot.paramMap.get('port');
    if (portS == null || isNaN(Number(portS))) {
      this.router.navigate(['/']);
      return;
    }
    let port = Number(portS);
    this.localStorageService.setServerHost(host);
    this.localStorageService.setServerPort(port);
    this.localStorageService.setServerProtocol(protocol);
    IrisinterfaceService.host = host;
    IrisinterfaceService.port = port;
    IrisinterfaceService.protocol = protocol;
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    this.router.navigate(['/']);
  }
}
