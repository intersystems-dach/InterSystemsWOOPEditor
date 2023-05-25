import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  getMessage() {
    return this.http.get('http://localhost:3000/api/message');
  }
  checkUser(username: string, password: string) {
    return this.http.get(
      'http://localhost:3000/api/checkuser?username=' +
        username +
        '&password=' +
        password
    );
  }
}
