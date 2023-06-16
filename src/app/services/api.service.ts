import { Injectable } from '@angular/core';
import { Chapter } from 'src/utils/classes';
import { User } from 'src/utils/interfaces';
import { Observable } from 'rxjs';
import { ExpressjsService } from './expressjs.service';
import { IrisinterfaceService } from './irisinterface.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private service: ExpressjsService,
    private service2: IrisinterfaceService
  ) {}

  isServerOnline() {
    return this.service2.isServerOnline();
  }

  checkUser(userName: string, password: string): Observable<User> {
    return this.service2.checkUser(userName, password);
  }

  getAllChapters(): Observable<any> {
    return this.service2.getAllChapters();
  }

  verifyChapter(chapterName: string, password: string): Observable<any> {
    return this.service2.verifyChapter(chapterName, password);
  }

  addNewChapter(chapter: Chapter): Observable<any> {
    return this.service2.addNewChapter(chapter);
  }

  updateChapter(chapter: Chapter): Observable<any> {
    return this.service2.updateChapter(chapter);
  }

  deleteChapter(chapter: Chapter): Observable<any> {
    return this.service2.deleteChapter(chapter);
  }

  uploadImage(name: string, content: any): Observable<any> {
    return this.service2.uploadImage(name, content);
  }
}
