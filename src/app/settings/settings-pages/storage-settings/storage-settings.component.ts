import { Component } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { UserManger } from 'src/utils/classes';
import { ChaptermanagerService } from 'src/app/services/chaptermanager.service';
import { HeaderComponent } from '../../../header/header.component';
import { IrisinterfaceService } from '../../../services/irisinterface.service';
import { NotificationComponent } from 'src/app/notification/notification.component';

@Component({
  selector: 'app-storage-settings',
  templateUrl: './storage-settings.component.html',
  styleUrls: ['./storage-settings.component.sass', '../stylesheet.scss'],
})
export class StorageSettingsComponent {
  showSelectChapter = false;

  constructor(
    private localStorageService: LocalStorageService,
    private chaptermanagerService: ChaptermanagerService,
    private irisinterfaceService: IrisinterfaceService
  ) {}

  clearStorage() {
    this.localStorageService.clearAll();
    NotificationComponent.showNotification('Success', 'Storage cleared!');
  }

  getRememberPage(): boolean {
    return this.localStorageService.rememberPage;
  }

  toggleRememberPage() {
    this.localStorageService.setRememberPage(
      !this.localStorageService.rememberPage
    );
  }

  exportChapter(event: any) {
    this.showSelectChapter = false;
    if (event == '') {
      return;
    }
    const chapter = this.chaptermanagerService.getChapterByName(event, false);
    console.log(chapter);
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(chapter));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute(
      'download',
      chapter.Title.replace(/ /g, '-') + '.woop'
    );
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
  importChapter() {
    // open file dialog
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.woop';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = (readerEvent: any) => {
        const content = readerEvent.target.result;
        let chapter = JSON.parse(content);
        chapter.Author = UserManger.userName;
        this.irisinterfaceService
          .importChapter(UserManger.userName, UserManger.password, chapter)
          .subscribe({
            next: (data) => {
              if (data.status) {
                NotificationComponent.showNotification(
                  'Chapter imported',
                  'The chapter was imported successfully!'
                );
                this.chaptermanagerService.chapters.push(chapter);
              } else {
                NotificationComponent.showNotification(
                  'Chapter import failed',
                  'The chapter could not be imported!',
                  5000,
                  true
                );
              }
            },
            error: (err) => {
              NotificationComponent.showNotification(
                'ERROR',
                'Chapter import failed: ' + err.message + '!',
                -1,
                true
              );
            },
          });
      };
    };
    input.click();
  }

  getUserLevel() {
    return UserManger.userLevel;
  }
  coookiesAccepted(): boolean {
    return LocalStorageService.cookiesAccepted;
  }

  toggleCookiesAccepted() {
    if (LocalStorageService.cookiesAccepted) {
      LocalStorageService.rejectCookies();
      NotificationComponent.showNotification(
        'Cookies rejected',
        'Cookies will not be used.'
      );
      return;
    }
    LocalStorageService.acceptCookies();
    NotificationComponent.showNotification(
      'Cookies accepted',
      'Cookies will be used.'
    );
  }
}
