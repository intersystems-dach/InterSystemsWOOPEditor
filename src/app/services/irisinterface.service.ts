import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chapter } from 'src/utils/classes';
import { Status, User } from 'src/utils/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IrisinterfaceService {
  private static host: string = 'localhost';
  private static port: number = 52773;

  constructor(private http: HttpClient) {}

  isServerOnline() {
    return this.http.get<string>(
      'http://' +
        IrisinterfaceService.host +
        ':' +
        IrisinterfaceService.port +
        '/woop/ping'
    );
  }

  /**
   * Checks if the user exists and if the password is correct
   * @param userName The userName
   * @param password The password
   * @returns A User object
   */
  checkUser(userName: string, password: string): Observable<User> {
    return this.http.get<any>(
      'http://' +
        IrisinterfaceService.host +
        ':' +
        IrisinterfaceService.port +
        '/woop/user/check?username=' +
        userName +
        '&password=' +
        password
    );
  }

  getAllChapters(): Observable<any> {
    return this.http.get(
      'http://' +
        IrisinterfaceService.host +
        ':' +
        IrisinterfaceService.port +
        '/api/woop/chapter/get/all'
    );
  }

  verifyChapter(chapterName: string, password: string): Observable<any> {
    return this.http.get(
      'http://' +
        IrisinterfaceService.host +
        ':' +
        IrisinterfaceService.port +
        '/api/woop/chapter/verify?title=' +
        chapterName +
        '&password=' +
        password
    );
  }
  /**
   * Adds a new chapter to the database
   * @param chapter The chapter to add
   * @returns A Status object
   */
  addNewChapter(chapter: Chapter): Observable<Status> {
    return this.http.post<Status>(
      'http://' +
        IrisinterfaceService.host +
        ':' +
        IrisinterfaceService.port +
        '/api/woop/chapter/new',
      chapter
    );
  }

  setColorSchemaForUser(userName: string, darkMode: boolean): Observable<any> {
    return this.http.post<any>(
      'http://' +
        IrisinterfaceService.host +
        ':' +
        IrisinterfaceService.port +
        '/woop/user/setdarkmode?username=' +
        userName +
        '&darkmode=' +
        (darkMode ? 1 : 0),
      {}
    );
  }
  updateChapter(chapter: Chapter): Observable<Status> {
    return this.http.post<Status>(
      'http://' +
        IrisinterfaceService.host +
        ':' +
        IrisinterfaceService.port +
        '/api/woop/chapter/update',
      chapter
    );
  }
  deleteChapter(chapter: Chapter): Observable<Status> {
    return this.http.post<Status>(
      'http://' +
        IrisinterfaceService.host +
        ':' +
        IrisinterfaceService.port +
        '/api/woop/chapter/delete',
      chapter
    );
  }
}
