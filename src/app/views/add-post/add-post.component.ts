import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  apiUrl = environment.apiUrl;
  addPostForm: FormGroup;

  ngOnInit(): void {
    this.addPostForm = new FormGroup({
      'title': new FormControl('', [Validators.required]),
      'description': new FormControl('', Validators.required),
      'image': new FormControl(null, [Validators.required])
    });
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addPostForm.patchValue({
      image: file
    });
    this.addPostForm.get('image').updateValueAndValidity()
  }

  onSubmit() {
    if (this.addPostForm.valid) {
      const formData = new FormData();
      formData.append('title', this.addPostForm.get('title').value);
      formData.append('description', this.addPostForm.get('description').value);
      formData.append('image', this.addPostForm.get('image').value);

      this.http.post(`${this.apiUrl}/post`, formData, { responseType: 'json', observe: 'body' }).subscribe(data => {
        this.toastr.success('¡Post añadido con exito!')
        this.router.navigate(['/'])
      }, (error) => {
        this.toastr.error('Ocurrio un error en el servidor , intenta mas tarde', error.message);
      });
    } else {
      this.toastr.error('Por favor revisa haber llenado toda la forma', 'Falta informacion')
    }
  }

}
