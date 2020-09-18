import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

interface IPost {
  title: string;
  description: string;
  date: Date;
  image: string;
}

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  id: number;
  apiUrl = environment.apiUrl;
  post: IPost;
  editPostForm: FormGroup;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.spinner.show();
      this.id = +params['id'];
      this.getPost(this.id).subscribe(data => {
        this.post = data['data'];
        this.editPostForm = new FormGroup({
          'title': new FormControl(this.post.title, [Validators.required]),
          'description': new FormControl(this.post.description, Validators.required),
          'image': new FormControl(null)
        });
        this.spinner.hide();
      });
    });
  }

  getPost(id: number) {
    return this.http.get(`${this.apiUrl}/post/${id}`, { responseType: 'json', observe: 'body' })
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.editPostForm.patchValue({
      image: file
    });
    this.editPostForm.get('image').updateValueAndValidity()
  }

  onSubmit() {
    if (this.editPostForm.valid) {
      const formData = new FormData();
      formData.append('title', this.editPostForm.get('title').value);
      formData.append('description', this.editPostForm.get('description').value);
      formData.append('image', this.editPostForm.get('image').value);

      console.log(this.editPostForm.value);

      this.http.patch(`${this.apiUrl}/post/${this.id}`, formData, { responseType: 'json', observe: 'body' }).subscribe(data => {
        this.toastr.success('¡Post añadido con exito!')
        this.route.params.subscribe(params => {
          this.spinner.show();
          this.id = +params['id'];
          this.getPost(this.id).subscribe(data => {
            this.post = data['data'];
            this.editPostForm = new FormGroup({
              'title': new FormControl(this.post.title, [Validators.required]),
              'description': new FormControl(this.post.description, Validators.required),
              'image': new FormControl(null)
            });
            this.spinner.hide();
          });
        });
      }, (error) => {
        this.toastr.error('Ocurrio un error en el servidor , intenta mas tarde', error.message);
      });
    } else {
      this.toastr.error('Por favor revisa haber llenado toda la forma', 'Falta informacion')
    }
  }
}
