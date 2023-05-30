import { Component, HostListener } from '@angular/core';
import { ApiService } from '../../api.service';
import { UserManger } from 'src/utils/classes';
import { Location } from '@angular/common';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.sass'],
})
export class LogInComponent {
  enteredPassword: string = '';
  entereduserName: string = '';

  isWrong: boolean = false;
  type: string = 'password';

  constructor(private apiService: ApiService, private location: Location) {}

  submit() {
    this.apiService
      .checkUser(this.entereduserName, this.enteredPassword)
      .subscribe((data) => {
        if (data.level > 0) {
          UserManger.userLevel = data.level;
          UserManger.userName = data.userName;
          this.close();
          return;
        }
        this.isWrong = true;
        this.enteredPassword = '';
        this.entereduserName = '';
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
    this.isWrong = false;
    this.enteredPassword = '';
    this.entereduserName = '';
    this.location.back();
  }
}
