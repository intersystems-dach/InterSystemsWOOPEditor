import { Component } from '@angular/core';
import { UserManger } from 'src/utils/classes';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  title = 'InterSystemsWOOP';

  isServerOnline = false;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    AppComponent.init();
    this.checkIfServerOnline();
    setInterval(() => {
      this.checkIfServerOnline();
    }, 5000);
  }

  checkIfServerOnline() {
    this.apiService.isServerOnline().subscribe({
      next: (data: any) => {
        this.isServerOnline = true;
      },
      error: (err) => {
        this.isServerOnline = false;
      },
    });
  }

  selectChapter(chapterName: string) {
    this.router.navigate(['/chapter', chapterName.replace(/\s/g, '-')]);
  }

  selectEditChapter(chapterName: string) {
    this.router.navigate(['/chapter', chapterName.replace(/\s/g, '-'), 'edit']);
  }

  getChapters() {
    return AppComponent.chapters;
  }

  getuserLevel() {
    return UserManger.userLevel;
  }

  getuserName() {
    return UserManger.userName;
  }
}
