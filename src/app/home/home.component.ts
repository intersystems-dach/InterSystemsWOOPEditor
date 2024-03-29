import { Component } from '@angular/core';
import { UserManger } from 'src/utils/classes';
import { Router } from '@angular/router';
import { ChaptermanagerService } from '../services/chaptermanager.service';
import { IrisinterfaceService } from '../services/irisinterface.service';
import { MetaDataService } from '../services/meta-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  title = 'InterSystemsWOOP';

  isServerOnline = false;

  constructor(
    private router: Router,
    private apiService: IrisinterfaceService,
    private chapterManager: ChaptermanagerService,
    private metaDataService: MetaDataService
  ) {}

  ngOnInit(): void {
    this.chapterManager.init();
    this.checkIfServerOnline();
    const interval = setInterval(() => {
      this.checkIfServerOnline();
      if (!this.isServerOnline && this.router.url == '/') {
        this.router.navigate(['/error']);
        clearInterval(interval);
      }
    }, 5000);
  }

  goToServerSettings() {
    this.router.navigate(['settings/server']);
  }

  checkIfServerOnline() {
    this.apiService.isServerOnline().subscribe({
      next: (data: any) => {
        this.isServerOnline = true;
      },
      error: (err) => {
        this.isServerOnline = false;
      },
    });
  }

  selectChapter(chapterName: string) {
    this.router.navigate(['/chapter', chapterName.replace(/\s/g, '-')]);
  }

  selectEditChapter(chapterName: string) {
    this.router.navigate(['/chapter', chapterName.replace(/\s/g, '-'), 'edit']);
  }
  goToWhatsNew() {
    this.router.navigate(['/info']);
  }
  getLatestVersion(): string {
    return this.metaDataService.version;
  }
  getInstancename(): string {
    return this.metaDataService.instanceName;
  }

  getChapters() {
    return this.chapterManager.chapters;
  }

  getuserLevel() {
    return UserManger.userLevel;
  }

  getuserName() {
    return UserManger.userName;
  }
}
