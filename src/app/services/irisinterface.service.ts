import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Chapter } from 'src/utils/classes';
import { Status, User } from 'src/utils/interfaces';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IrisinterfaceService {
  private static host: string = 'localhost';
  private static port: number = 52773;

  constructor(private http: HttpClient) {}

  isServerOnline() {
    return this.http
      .get<string>(
        'http://' +
          IrisinterfaceService.host +
          ':' +
          IrisinterfaceService.port +
          '/woop/ping'
      )
      .pipe(
        catchError((err) => {
          throw new Error('error'); //Rethrow it back to component
        })
      );
  }

  /**
   * Checks if the user exists and if the password is correct
   * @param userName The userName
   * @param password The password
   * @returns A User object
   */
  checkUser(userName: string, password: string): Observable<User> {
    // make request and handle 404 status
    return this.http
      .get<User>(
        'http://' +
          IrisinterfaceService.host +
          ':' +
          IrisinterfaceService.port +
          '/woop/user/check?username=' +
          userName +
          '&password=' +
          password
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 404) {
            throw new Error('Username or password is wrong');
          } else if (err.status === 0) {
            throw new Error('Server is offline');
          } else throw new Error('unknown error');
        })
      );
  }

  getAllChapters(): Observable<any> {
    return this.http.get(
      'http://' +
        IrisinterfaceService.host +
        ':' +
        IrisinterfaceService.port +
        '/woop/chapter/get/all'
    );
  }

  verifyChapter(chapterName: string, password: string): Observable<any> {
    return this.http
      .get(
        'http://' +
          IrisinterfaceService.host +
          ':' +
          IrisinterfaceService.port +
          '/woop/chapter/verify?title=' +
          chapterName +
          '&password=' +
          password
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 404) {
            throw new Error('Could not find chapter');
          } else if (err.status === 0) {
            throw new Error('Server is offline');
          } else throw new Error('unknown error');
        })
      );
  }

  /**
   * Adds a new chapter to the database
   * @param chapter The chapter to add
   * @returns A Status object
   */
  addNewChapter(chapter: Chapter): Observable<any> {
    return this.http
      .post(
        'http://' +
          IrisinterfaceService.host +
          ':' +
          IrisinterfaceService.port +
          '/woop/chapter/new',
        chapter
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 409) {
            throw new Error('Chapter already exists');
          } else if (err.status === 500) {
            throw new Error('Chapter could not be saved');
          } else if (err.status === 0) {
            throw new Error('Server is offline');
          } else throw new Error('unknown error');
        })
      );
  }

  setColorSchemaForUser(userName: string, darkMode: boolean): Observable<any> {
    return this.http.post<any>(
      'http://' +
        IrisinterfaceService.host +
        ':' +
        IrisinterfaceService.port +
        '/woop/user/set/darkmode?username=' +
        userName +
        '&darkmode=' +
        (darkMode ? 1 : 0),
      {}
    );
  }

  updateChapter(chapter: Chapter): Observable<any> {
    return this.http
      .post(
        'http://' +
          IrisinterfaceService.host +
          ':' +
          IrisinterfaceService.port +
          '/woop/chapter/update',
        chapter
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 404) {
            throw new Error('Chapter not found');
          } else if (err.status === 500) {
            throw new Error('Chapter could not be updated');
          } else if (err.status === 0) {
            throw new Error('Server is offline');
          } else throw new Error('unknown error');
        })
      );
  }

  deleteChapter(chapter: Chapter): Observable<any> {
    return this.http
      .post(
        'http://' +
          IrisinterfaceService.host +
          ':' +
          IrisinterfaceService.port +
          '/woop/chapter/delete',
        chapter
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 404) {
            throw new Error('Chapter not found');
          } else if (err.status === 500) {
            throw new Error('Chapter could not be deleted');
          } else if (err.status === 0) {
            throw new Error('Server is offline');
          } else throw new Error('unknown error');
        })
      );
  }
}
