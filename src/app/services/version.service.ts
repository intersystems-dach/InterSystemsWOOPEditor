import { Injectable } from '@angular/core';
import { Version } from 'src/utils/classes';

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  versions: Version[] = [];

  constructor() {
    this.versions = [
      new Version('1.0.1', '7 July 2023', [
        'Bug Fixes',
        'Added Whats New Page',
        'Remember page when editing a chapter',
        'Import and export chapters',
      ]),
      new Version('1.0.0', '4 July 2023', ['Initial Release']),
    ];
  }

  getLatestVersion(): Version {
    return this.versions[0];
  }
}
