import {
  Component,
  Input,
  EventEmitter,
  Output,
  HostListener,
} from '@angular/core';
import { Chapter, UserManger } from 'src/utils/classes';
import { ChaptermanagerService } from '../services/chaptermanager.service';
import { IrisinterfaceService } from '../services/irisinterface.service';

@Component({
  selector: 'app-chapter-new',
  templateUrl: './chapter-new.component.html',
  styleUrls: ['./chapter-new.component.scss'],
})
export class ChapterNewComponent {
  @Input() name: string = '';
  @Input() language: string = 'english';
  @Input() password: string = '';
  @Input() description: string = '';
  @Input() isPrivate: boolean = false;

  isWrong: boolean = false;
  wrongText: string = '';
  @Output() closeEmitter = new EventEmitter<boolean>();

  constructor(
    private apiService: IrisinterfaceService,
    private chapterManger: ChaptermanagerService
  ) {}

  async submit() {
    if (this.name === '') {
      this.isWrong = true;
      this.wrongText = 'Please enter a name';
      return;
    }

    if(this.name.includes('#')){
      this.isWrong = true;
      this.wrongText = 'Chapter name cannot contain #';
      return;
    }

    let newChapter = new Chapter(
      this.name,
      UserManger.userName,
      [],
      this.password,
      this.language,
      this.description,
      this.isPrivate
    );
    this.apiService.addNewChapter(newChapter).subscribe({
      next: (data) => {
        if (data.status) {
          this.closeEmitter.emit();
          this.name = '';
          this.language = 'english';
          this.password = '';
          this.description = '';
          this.isPrivate = false;
          this.chapterManger.chapters.push(newChapter);
        } else {
          this.isWrong = true;
          this.wrongText = 'Something went wrong!';
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
