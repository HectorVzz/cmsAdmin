import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { _ParseAST } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {

    return this.http.post(`${this.apiUrl}/auth/login`, { username, password }, { responseType: 'json', observe: 'body' })
  }

  setSession(token) {
    localStorage.setItem('id_token', token);
  }

  logout() {
    localStorage.removeItem("id_token");
  }

  islogged() {
    return localStorage.getItem('id_token') ? true : false;
  }
}
