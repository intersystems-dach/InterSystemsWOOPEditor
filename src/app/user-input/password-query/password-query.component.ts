import { IrisinterfaceService } from 'src/app/services/irisinterface.service';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-password-query',
  templateUrl: './password-query.component.html',
  styleUrls: ['./password-query.component.scss'],
})
export class PasswordQueryComponent {
  enteredPassword: string = '';
  isWrong: boolean = false;
  wrongText = '';
  type: string = 'password';
  @Input() chapterName: string = '';

  @Output() passwordEntered = new EventEmitter<string>();

  constructor(private apiService: IrisinterfaceService) {}

  submit() {
    this.apiService
      .verifyChapter(this.chapterName, this.enteredPassword)
      .subscribe({
        next: (res: any) => {
          if (res.status) {
            this.passwordEntered.emit(this.enteredPassword);
            this.isWrong = false;
            this.enteredPassword = '';
          } else {
            this.isWrong = true;
            this.enteredPassword = '';
            this.wrongText = 'Wrong password';
          }
        },
        error: (err: any) => {
          this.isWrong = true;
          this.wrongText = err.message;
        },
      });
  }

  viewPassword() {
    if (this.type === 'password') {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
  @HostListener('document:keydown.escape', ['$event'])
  close() {
    this.passwordEntered.emit(undefined);
    this.isWrong = false;
    this.enteredPassword = '';
  }
}
