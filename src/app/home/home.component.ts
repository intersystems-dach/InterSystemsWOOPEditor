import { Component } from '@angular/core';
import { UserManger } from 'src/utils/classes';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  title = 'InterSystemsWOOP';

  constructor(private router: Router) {}

  ngOnInit(): void {
    AppComponent.init();
    console.log(AppComponent.chapters.length);
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
