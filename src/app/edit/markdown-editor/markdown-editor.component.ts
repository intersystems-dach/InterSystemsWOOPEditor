import { Component, EventEmitter, Output } from '@angular/core';
import { IrisinterfaceService } from 'src/app/services/irisinterface.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss'],
})
export class MarkdownEditorComponent {
  addImageOpened = false;
  addFileOpened = false;
  translateSpecOpen = false;

  @Output() eventEmitter = new EventEmitter<string>();

  constructor(
    private apiService: IrisinterfaceService,
    private router: Router
  ) {}

  emit(value: string) {
    this.eventEmitter.emit(value);
  }

  addImage(img: string) {
    if (img !== '') {
      this.emit(img);
    }
    this.addImageOpened = false;
  }

  addFile(file: string) {
    if (file !== '') {
      this.emit(file);
    }
    this.addFileOpened = false;
  }

  openAddImage() {
    this.addImageOpened = true;
  }
  openAddFile() {
    this.addFileOpened = true;
  }

  openTranslateSpec() {
    this.translateSpecOpen = true;
  }

  closeTranslateSpec() {
    this.translateSpecOpen = false;
  }

  closeAddImage() {
    this.addImageOpened = false;
  }

  translateSpec(toLanguage: string) {
    if(toLanguage !== 'close') {
      this.emit("translate," + toLanguage);
    }
    this.closeTranslateSpec();
  }

  help() {
    this.router.navigate(['/markdown']);
  }
}
