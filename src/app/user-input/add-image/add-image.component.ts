import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { IrisinterfaceService } from 'src/app/services/irisinterface.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss'],
})
export class AddImageComponent {
  @Output() imageEmitter = new EventEmitter<string>();
  selectImage = false;
  selectedImage = '';

  imageNames: string[] = [];

  constructor(private apiService: IrisinterfaceService) {}

  @HostListener('document:keydown.escape', ['$event'])
  close() {
    this.imageEmitter.emit('');
  }

  select() {
    this.apiService.getAllImageNames().subscribe({
      next: (res) => {
        this.imageNames = res;
        this.selectImage = true;
      },
      error: (err) => {
        alert('Error getting image names:' + err.message);
      },
    });
  }

  selectTheImage() {
    this.imageEmitter.emit(
      `?[${this.selectedImage}](${this.selectedImage}){width:100%}`
    );
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
        const binary = reader.result as ArrayBuffer;
        this.apiService.uploadImage(file.name, binary).subscribe({
          next: (res) => {
            if (res.status) {
              alert('Image uploaded: ' + res.newName);
              this.imageEmitter.emit(
                `?[${res.newName}](${res.newName}){width:100%}`
              );
            } else {
              alert('Could not upload image!');
            }
          },
          error: (err) => {
            alert('Error uploading image:' + err.message);
          },
        });
      };
    };
    input.click();
  }
}
