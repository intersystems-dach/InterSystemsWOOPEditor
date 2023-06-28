import { Component, EventEmitter, Output } from '@angular/core';
import { IrisinterfaceService } from 'src/app/services/irisinterface.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.sass'],
})
export class MarkdownEditorComponent {
  addImageOpened = false;

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

  openAddImage() {
    this.addImageOpened = true;
  }

  closeAddImage() {
    this.addImageOpened = false;
  }

  help() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/markdown'])
    );
    window.open(url, '_blank');
  }
}
