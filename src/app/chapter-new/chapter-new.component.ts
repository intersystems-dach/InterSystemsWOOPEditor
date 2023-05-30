import {
  Component,
  Input,
  EventEmitter,
  Output,
  HostListener,
} from '@angular/core';
import { Chapter, Config, UserManger } from 'src/utils/classes';
import { ApiService } from '../api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-chapter-new',
  templateUrl: './chapter-new.component.html',
  styleUrls: ['./chapter-new.component.sass'],
})
export class ChapterNewComponent {
  @Input() name: string = '';
  @Input() language: string = 'english';
  @Input() password: string = '';
  @Input() description: string = '';
  @Input() isPrivate: boolean = false;
  @Input() updateChapter: Chapter | undefined = undefined;

  isWrong: boolean = false;
  wrongText: string = '';
  @Output() closeEmitter = new EventEmitter<boolean>();

  constructor(private apiService: ApiService) {}

  async submit() {
    if (this.name === '') {
      this.isWrong = true;
      this.wrongText = 'Please enter a name';
      return;
    }
    if (this.updateChapter === undefined) {
      let newChapter = new Chapter(
        this.name,
        [],
        new Config(
          this.password,
          this.language,
          UserManger.userName,
          this.description,
          this.isPrivate
        )
      );
      this.apiService.addNewChapter(newChapter).subscribe((data) => {
        if (data.ok) {
          this.closeEmitter.emit();
          this.name = '';
          this.language = 'english';
          this.password = '';
          this.description = '';
          this.isPrivate = false;
          AppComponent.chapters.push(newChapter);
        } else {
          this.isWrong = true;
          this.wrongText = data.message;
        }
      });
    } else {
      this.updateChapter.config.password = this.password;
      this.updateChapter.config.language = this.language;
      this.updateChapter.config.description = this.description;
      this.updateChapter.config.isPrivate = this.isPrivate;
      this.apiService.updateChapter(this.updateChapter).subscribe((data) => {
        if (data.ok) {
          this.closeEmitter.emit();
          this.name = '';
          this.language = 'english';
          this.password = '';
          this.description = '';
          this.updateChapter = undefined;
          this.isPrivate = false;
        } else {
          this.isWrong = true;
          this.wrongText = data.message;
        }
      });
    }
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
