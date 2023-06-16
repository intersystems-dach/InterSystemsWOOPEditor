import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';

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
        const base64 = reader.result as string;
        console.log(`![${file.name}](${base64})`);
        this.apiService.uploadImage(file.name, base64).subscribe((res) => {
          console.log(res);
        });
        //this.emit(`![${file.name}](${base64})`);
      };
    };
    input.click();
  }

  addImage() {}
}
