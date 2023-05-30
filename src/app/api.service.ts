import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chapter } from 'src/utils/classes';
import { Status, User } from 'src/utils/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private static host: string = 'localhost';
  private static port: number = 3000;

  constructor(private http: HttpClient) {}

  isServerOnline() {
    return this.http
      .get<string>('http://' + ApiService.host + ':' + ApiService.port + '/')
      .subscribe((res) => {
        console.log(res);
        return true;
      });
  }

  /**
   * Checks if the user exists and if the password is correct
   * @param userName The userName
   * @param password The password
   * @returns A User object
   */
  checkUser(userName: string, password: string): Observable<User> {
    return this.http.get<User>(
      'http://' +
        ApiService.host +
        ':' +
        ApiService.port +
        '/api/woop/checkuser?userName=' +
        userName +
        '&password=' +
        password
    );
  }

  getAllChapters(): Observable<any> {
    return this.http.get(
      'http://' +
        ApiService.host +
        ':' +
        ApiService.port +
        '/api/woop/chapter/get/all'
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
        ApiService.host +
        ':' +
        ApiService.port +
        '/api/woop/chapter/new',
      chapter
    );
  }
  updateChapter(chapter: Chapter): Observable<Status> {
    return this.http.post<Status>(
      'http://' +
        ApiService.host +
        ':' +
        ApiService.port +
        '/api/woop/chapter/update',
      chapter
    );
  }
  deleteChapter(chapter: Chapter): Observable<Status> {
    return this.http.post<Status>(
      'http://' +
        ApiService.host +
        ':' +
        ApiService.port +
        '/api/woop/chapter/delete',
      chapter
    );
  }
}
