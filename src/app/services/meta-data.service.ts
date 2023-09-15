import { Injectable } from '@angular/core';
import { IrisinterfaceService } from './irisinterface.service';

@Injectable({
  providedIn: 'root',
})
export class MetaDataService {
  version: string = 'unknown';
  date: string = 'unknown';

  constructor(private apiService: IrisinterfaceService) {
    this.init();
  }

  init() {
    this.apiService.getVersion().subscribe({
      next: (data: any) => {
        this.version = data.version;
        this.date = data.date;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
