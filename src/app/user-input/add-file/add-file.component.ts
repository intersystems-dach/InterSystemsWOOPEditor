import { Component, EventEmitter, HostListener, Output } from '@angular/core';
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
        alert('Error getting file names:' + err.message);
      },
    });
  }

  selectTheFile() {
    this.fileEmitter.emit(
      `$$$[Download](${this.selectedFile})`
    );
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
              alert('File uploaded: ' + res.newName);
              this.fileEmitter.emit(
                `$$$[Download](${res.newName})`
              );
            } else {
              alert('Could not upload file!');
            }
          },
          error: (err) => {
            alert('Error uploading file:' + err.message);
          },
        });
      };

    };
    input.click();
  }
}
