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
  constructor(private service: IrisinterfaceService) {}

  isServerOnline() {
    return this.service.isServerOnline();
  }

  checkUser(userName: string, password: string): Observable<User> {
    return this.service.checkUser(userName, password);
  }

  getAllChapters(): Observable<any> {
    return this.service.getAllChapters();
  }

  verifyChapter(chapterName: string, password: string): Observable<any> {
    return this.service.verifyChapter(chapterName, password);
  }

  addNewChapter(chapter: Chapter): Observable<any> {
    return this.service.addNewChapter(chapter);
  }

  updateChapter(chapter: Chapter): Observable<any> {
    return this.service.updateChapter(chapter);
  }

  deleteChapter(chapter: Chapter): Observable<any> {
    return this.service.deleteChapter(chapter);
  }

  uploadImage(name: string, content: any): Observable<any> {
    return this.service.uploadImage(name, content);
  }

  getAllImageNames(): Observable<any> {
    return this.service.getAllImageNames();
  }
}
