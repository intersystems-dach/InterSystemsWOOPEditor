import {
  Component,
  Input,
  EventEmitter,
  Output,
  HostListener,
} from '@angular/core';
import { IrisinterfaceService } from 'src/app/services/irisinterface.service';
import { Chapter, UserManger } from 'src/utils/classes';

@Component({
  selector: 'app-edit-chapter-meta-data',
  templateUrl: './edit-chapter-meta-data.component.html',
  styleUrls: ['./edit-chapter-meta-data.component.scss'],
})
export class EditChapterMetaDataComponent {
  @Input() name: string = '';
  @Input() language: string = 'english';
  @Input() password: string = '';
  @Input() description: string = '';
  @Input() isPrivate: boolean = false;
  @Input() updateChapter: Chapter | undefined = undefined;

  isWrong: boolean = false;
  wrongText: string = '';
  @Output() closeEmitter = new EventEmitter<boolean>();

  constructor(private apiService: IrisinterfaceService) {}

  async submit() {
    if (this.updateChapter === undefined) {
      return;
    }

    this.updateChapter.Password = this.password;
    this.updateChapter.Language = this.language;
    this.updateChapter.Description = this.description;
    this.updateChapter.IsPrivate = this.isPrivate;
    this.apiService
      .updateChapter(
        this.updateChapter,
        UserManger.userName,
        UserManger.password
      )
      .subscribe({
        next: (data) => {
          if (data.status) {
            this.closeEmitter.emit();
            this.name = '';
            this.language = 'english';
            this.password = '';
            this.description = '';
            this.updateChapter = undefined;
            this.isPrivate = false;
          } else {
            this.isWrong = true;
            this.wrongText = 'error';
          }
        },
        error: (err: any) => {
          this.isWrong = true;
          this.wrongText = err.message;
        },
      });
  }

  @HostListener('document:keydown.escape', ['$event'])
  close() {
    this.closeEmitter.emit();
    this.isWrong = false;
    this.name = '';
    this.language = 'english';
    this.password = '';
    this.description = '';
    this.isPrivate = false;
  }
}
