import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IrisinterfaceService } from 'src/app/services/irisinterface.service';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.sass'],
})
export class MarkdownEditorComponent {
  @Output() eventEmitter = new EventEmitter<string>();

  constructor(private apiService: ApiService) {}

  emit(value: string) {
    this.eventEmitter.emit(value);
  }

  uploadImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // get as binary
        const binary = reader.result as ArrayBuffer;
        /* this.apiService.uploadImage(file.name, base64).subscribe((res) => {
          console.log(res);
        }); */
        this.apiService.uploadImage(file.name, binary).subscribe((res) => {
          console.log(res);
        });
        this.emit(
          `![${file.name}](http://${IrisinterfaceService.host}:${IrisinterfaceService.port}/woop/image/get/${file.name}){width:100%}`
        );
      };
    };
    input.click();
  }

  addImage() {}
}
