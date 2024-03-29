import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { NotificationComponent } from 'src/app/notification/notification.component';
import { IrisinterfaceService } from 'src/app/services/irisinterface.service';
import { UserManger } from 'src/utils/classes';

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
        NotificationComponent.showNotification(
          'Error getting image names',
          err.message,
          -1,
          true
        );
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
        this.apiService
          .uploadImage(
            file.name,
            binary,
            UserManger.userName,
            UserManger.password
          )
          .subscribe({
            next: (res) => {
              if (res.status) {
                NotificationComponent.showNotification(
                  'Success',
                  'Image uploaded: ' + res.newName
                );
                this.imageEmitter.emit(
                  `?[${res.newName}](${res.newName}){width:100%}`
                );
              } else {
                NotificationComponent.showNotification(
                  'Error uploading image',
                  'Could not upload image!',
                  5000,
                  true
                );
              }
            },
            error: (err) => {
              NotificationComponent.showNotification(
                'Error uploading image',
                err.message,
                -1,
                true
              );
            },
          });
      };
    };
    input.click();
  }
}
