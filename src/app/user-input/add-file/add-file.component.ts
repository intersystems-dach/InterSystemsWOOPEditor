import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { NotificationComponent } from 'src/app/notification/notification.component';
import { IrisinterfaceService } from 'src/app/services/irisinterface.service';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss'],
})
export class AddFileComponent {
  @Output() fileEmitter = new EventEmitter<string>();
  selectFile = false;
  selectedFile = '';

  fileNames: string[] = [];

  constructor(private apiService: IrisinterfaceService) {}

  @HostListener('document:keydown.escape', ['$event'])
  close() {
    this.fileEmitter.emit('');
  }

  select() {
    this.apiService.getAllFileNames().subscribe({
      next: (res) => {
        this.fileNames = res;
        this.selectFile = true;
      },
      error: (err) => {
        NotificationComponent.showNotification(
          'Error getting file names',
          err.message,
          -1,
          true
        );
      },
    });
  }

  selectTheFile() {
    this.fileEmitter.emit(`$$$[Download](${this.selectedFile})`);
  }

  uploadFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);

      // read the content of the file
      reader.onload = () => {
        // convert it to base64

        this.apiService.uploadFile(file.name, reader.result).subscribe({
          next: (res) => {
            if (res.status) {
              NotificationComponent.showNotification(
                'Success',
                'File uploaded: ' + res.newName
              );
              this.fileEmitter.emit(`$$$[Download](${res.newName})`);
            } else {
              NotificationComponent.showNotification(
                'Error uploading file',
                'Could not upload file!',
                5000,
                true
              );
            }
          },
          error: (err) => {
            NotificationComponent.showNotification(
              'Error uploading file',
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
