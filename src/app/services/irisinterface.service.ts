import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Chapter } from 'src/utils/classes';
import { User } from 'src/utils/interfaces';
import { Observable, catchError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class IrisinterfaceService {
  public static host: string = 'localhost';
  public static port: number = 52773;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    IrisinterfaceService.host = localStorageService.getServerHost();
    IrisinterfaceService.port = localStorageService.getServerPort();
  }

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

  getVersion(): Observable<any> {
    return this.http.get(
      'http://' +
        IrisinterfaceService.host +
        ':' +
        IrisinterfaceService.port +
        '/woop/version'
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
          } else throw new Error('unknown error: ' + err.status);
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
          } else throw new Error('unknown error: ' + err.status);
        })
      );
  }

  getChapterPassword(
    chapterName: string,
    userName: string,
    password: string
  ): Observable<any> {
    return this.http
      .get(
        'http://' +
          IrisinterfaceService.host +
          ':' +
          IrisinterfaceService.port +
          '/woop/chapter/get/password?title=' +
          chapterName +
          '&username=' +
          userName +
          '&password=' +
          password
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 404) {
            throw new Error('Could not find chapter');
          } else if (err.status === 401) {
            throw new Error('Unauthorized');
          } else if (err.status === 0) {
            throw new Error('Server is offline');
          } else throw new Error('unknown error: ' + err.status);
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
          } else throw new Error('unknown error: ' + err.status);
        })
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
          } else throw new Error('unknown error: ' + err.status);
        })
      );
  }

  importChapter(
    username: string,
    password: string,
    chapter: Chapter
  ): Observable<any> {
    return this.http
      .post(
        'http://' +
          IrisinterfaceService.host +
          ':' +
          IrisinterfaceService.port +
          '/woop/chapter/import?username=' +
          username +
          '&password=' +
          password,
        chapter
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            throw new Error('Unauthorized');
          } else if (err.status === 500) {
            throw new Error('Chapter could not be imported');
          } else if (err.status === 0) {
            throw new Error('Server is offline');
          } else throw new Error('unknown error: ' + err.status);
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
          } else throw new Error('unknown error: ' + err.status);
        })
      );
  }

  uploadImage(name: string, content: any): Observable<any> {
    return this.http
      .post(
        'http://' +
          IrisinterfaceService.host +
          ':' +
          IrisinterfaceService.port +
          '/woop/image/upload',
        { Name: name, Content: content }
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 0) {
            throw new Error('Server is offline');
          } else throw new Error('unknown error: ' + err.status);
        })
      );
  }

  getAllImageNames(): Observable<any> {
    return this.http
      .get(
        'http://' +
          IrisinterfaceService.host +
          ':' +
          IrisinterfaceService.port +
          '/woop/image/name/get/all'
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 500) {
            throw new Error('Could not get image names');
          } else if (err.status === 0) {
            throw new Error('Server is offline');
          } else throw new Error('unknown error: ' + err.status);
        })
      );
  }

  addUser(
    username: string,
    password: string,
    newUserName: string,
    newPassword: string
  ): Observable<any> {
    return this.http
      .post(
        'http://' +
          IrisinterfaceService.host +
          ':' +
          IrisinterfaceService.port +
          '/woop/user/add',
        {
          userName: username,
          password: password,
          newUserName: newUserName,
          newPassword: newPassword,
        }
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            throw new Error('Unauthorized');
          } else if (err.status === 409) {
            throw new Error('User already exists');
          } else if (err.status === 0) {
            throw new Error('Server is offline');
          } else {
            console.log(err.message);
            throw new Error('unknown error: ' + err.status);
          }
        })
      );
  }

  deleteUser(
    username: string,
    password: string,
    userNameToDelete: string
  ): Observable<any> {
    return this.http
      .post(
        'http://' +
          IrisinterfaceService.host +
          ':' +
          IrisinterfaceService.port +
          '/woop/user/delete',
        {
          userName: username,
          password: password,
          userNameToDelete: userNameToDelete,
        }
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            throw new Error('Unauthorized');
          } else if (err.status === 404) {
            throw new Error('User not found');
          } else if (err.status === 0) {
            throw new Error('Server is offline');
          } else {
            console.log(err.message);
            throw new Error('unknown error: ' + err.status);
          }
        })
      );
  }

  makeUserAdmin(
    username: string,
    password: string,
    userNameToMakeAdmin: string
  ): Observable<any> {
    return this.http
      .post(
        'http://' +
          IrisinterfaceService.host +
          ':' +
          IrisinterfaceService.port +
          '/woop/user/make/admin',
        {
          userName: username,
          password: password,
          userNameToMakeAdmin: userNameToMakeAdmin,
        }
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            throw new Error('Unauthorized');
          } else if (err.status === 404) {
            throw new Error('User not found');
          } else if (err.status === 0) {
            throw new Error('Server is offline');
          } else {
            console.log(err.message);
            throw new Error('unknown error: ' + err.status);
          }
        })
      );
  }

  changePassword(
    username: string,
    password: string,
    newPassword: string
  ): Observable<any> {
    return this.http
      .post(
        'http://' +
          IrisinterfaceService.host +
          ':' +
          IrisinterfaceService.port +
          '/woop/user/change/password',
        {
          userName: username,
          password: password,
          newPassword: newPassword,
        }
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            throw new Error('Unauthorized');
          } else if (err.status === 404) {
            throw new Error('User not found');
          } else if (err.status === 0) {
            throw new Error('Server is offline');
          } else {
            console.log(err.message);
            throw new Error('unknown error: ' + err.status);
          }
        })
      );
  }

  deployAll(username: string, password: string): Observable<any> {
    return this.http
      .get(
        'http://' +
          IrisinterfaceService.host +
          ':' +
          IrisinterfaceService.port +
          '/woop/deploy/all?username=' +
          username +
          '&password=' +
          password
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            throw new Error('Unauthorized');
          } else if (err.status === 500) {
            throw new Error('Something went wrong');
          } else if (err.status === 0) {
            throw new Error('Server is offline');
          } else {
            console.log(err.message);
            throw new Error('unknown error: ' + err.status);
          }
        })
      );
  }
}
