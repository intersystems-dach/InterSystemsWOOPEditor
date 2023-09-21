import { Injectable } from '@angular/core';
import { IrisinterfaceService } from './irisinterface.service';

@Injectable({
  providedIn: 'root',
})
export class MetaDataService {
  version: string = 'unknown';
  date: string = 'unknown';
  notes: string[] = [];
  instanceName = 'Server';

  constructor(private apiService: IrisinterfaceService) {
    this.init();
  }

  init() {
    this.apiService.getVersion().subscribe({
      next: (data: any) => {
        this.version = data.version;
        this.date = data.date;
        this.notes = data.notes.split(';');
        this.instanceName = data.instanceName;
      },
      error: (err) => {
        this.version = 'unknown';
        this.date = 'unknown';
        this.notes = [];
        this.instanceName = 'Server';

      },
    });
  }
}
