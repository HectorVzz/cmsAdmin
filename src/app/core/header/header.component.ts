import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { _ParseAST } from '@angular/compiler';
import { AuthService } from 'src/app/services/auth.service';

interface INavData {
  title: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  navData: INavData;
  get title() { return (this.navData && this.navData.title) ? this.navData.title : null}


  ngOnInit(): void {
    this.getNavData().subscribe((data) => {
      this.navData = data['data'];
    })
  }


  getNavData() {
    return this.http.get('http://localhost:5000/navdata', { responseType: 'json', observe: 'body' });
  }

  logout(): void{
    this.authService.logout();
  }

}
