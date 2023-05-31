import { ApiService } from '../../services/api.service';
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
  styleUrls: ['./password-query.component.sass'],
})
export class PasswordQueryComponent {
  enteredPassword: string = '';
  isWrong: boolean = false;
  type: string = 'password';
  @Input() chapterName: string = '';

  @Output() passwordEntered = new EventEmitter<boolean>();

  constructor(private apiService: ApiService) {}

  submit() {
    this.apiService
      .verifyChapter(this.chapterName, this.enteredPassword)
      .subscribe((res: any) => {
        if (res.ok) {
          this.passwordEntered.emit(true);
          this.isWrong = false;
          this.enteredPassword = '';
        } else {
          this.isWrong = true;
          this.enteredPassword = '';
        }
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
    this.passwordEntered.emit(false);
    this.isWrong = false;
    this.enteredPassword = '';
  }
}
