import { Component, Input, EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../app.component';
import { Chapter, Config } from 'src/utils/classes';
import { FileManager } from 'src/utils/FileManager';

@Component({
  selector: 'app-chapter-new',
  templateUrl: './chapter-new.component.html',
  styleUrls: ['./chapter-new.component.sass'],
})
export class ChapterNewComponent {
  name: string = '';
  language: string = 'english';
  password: string = '';
  description: string = '';

  isWrong: boolean = false;
  wrongText: string = '';

  @Output() closeEmitter = new EventEmitter<boolean>();

  async submit() {
    if (this.name === '') {
      this.isWrong = true;
      this.wrongText = 'Please enter a name';
      return;
    }
    let newChapter = new Chapter(
      this.name,
      [],
      new Config(
        this.password,
        this.language,
        AppComponent.UserName,
        this.description
      )
    );

    let r = await FileManager.writeNewChapter(newChapter);
    if (r) {
      this.closeEmitter.emit();
      this.name = '';
      this.language = 'english';
      this.password = '';
      this.description = '';
    } else {
      this.isWrong = true;
      this.wrongText = 'Could not save chapter';
    }
  }

  close() {
    this.closeEmitter.emit();
    this.isWrong = false;
    this.name = '';
    this.language = 'english';
    this.password = '';
    this.description = '';
  }
}
