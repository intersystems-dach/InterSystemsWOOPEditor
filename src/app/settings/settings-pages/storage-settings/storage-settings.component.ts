import { Component } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { UserManger } from 'src/utils/classes';
import { ChaptermanagerService } from 'src/app/services/chaptermanager.service';
import { HeaderComponent } from '../../../header/header.component';
import { IrisinterfaceService } from '../../../services/irisinterface.service';

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
                alert('Chapter imported!');
                this.chaptermanagerService.chapters.push(chapter);
              } else {
                alert('Chapter import failed!');
              }
            },
            error: (err) => {
              alert('Chapter import failed:' + err.message);
            },
          });
      };
    };
    input.click();
  }

  getUserLevel() {
    return UserManger.userLevel;
  }
}
