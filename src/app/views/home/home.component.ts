import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

interface IPost {
  id: number;
  title: string;
  description: string;
  date: Date;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, private toastr: ToastrService){}
  apiUrl = environment.apiUrl;
  posts: IPost[];

  ngOnInit(){
    this.getPosts();
  }

  getPosts() {
    return this.http.get(`${this.apiUrl}/post`, { responseType: 'json', observe: 'body' }).subscribe((data) => {
      this.posts = data['data'];
    });
  }

  deletePost(id: number){
    this.http.delete(`${this.apiUrl}/post/${id}`,{ responseType: 'json', observe: 'body' }).subscribe((data) => {
      this.toastr.success('Post eliminado con exito')
      this.getPosts();
    }, error => {
      this.toastr.error('Ocurrio un error al intentar eliminar el post , intenta mas tarde.')
    });
  }

}
