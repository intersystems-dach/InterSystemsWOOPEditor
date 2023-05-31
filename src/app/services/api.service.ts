import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chapter } from 'src/utils/classes';
import { Status, User } from 'src/utils/interfaces';
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

  /**
   * Checks if the user exists and if the password is correct
   * @param userName The userName
   * @param password The password
   * @returns A User object
   */
  checkUser(userName: string, password: string): Observable<User> {
    return this.service2.checkUser(userName, password);
  }

  getAllChapters(): Observable<any> {
    return this.service.getAllChapters();
  }

  verifyChapter(chapterName: string, password: string): Observable<any> {
    return this.service.verifyChapter(chapterName, password);
  }
  /**
   * Adds a new chapter to the database
   * @param chapter The chapter to add
   * @returns A Status object
   */
  addNewChapter(chapter: Chapter): Observable<Status> {
    return this.service.addNewChapter(chapter);
  }

  setColorSchemaForUser(userName: string, darkMode: boolean): Observable<any> {
    return this.service2.setColorSchemaForUser(userName, darkMode);
  }
  updateChapter(chapter: Chapter): Observable<Status> {
    return this.service.updateChapter(chapter);
  }
  deleteChapter(chapter: Chapter): Observable<Status> {
    return this.service.deleteChapter(chapter);
  }
}