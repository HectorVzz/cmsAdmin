import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  apiUrl = environment.apiUrl;
  editNavForm: FormGroup;
  editBodyForm: FormGroup;
  navTitle: string;
  bodyData: string;
  descriptionData: string;
  loadingBodyData = true;
  loadingNavData = true;

  ngOnInit(): void {
    this.getNavData();
    this.getBodyData();
  }

  getNavData() {
    return this.http.get('http://localhost:5000/navdata', { responseType: 'json', observe: 'body' }).subscribe(data => {
      this.navTitle = data['data']['title'];
      this.editNavForm = new FormGroup({
        'title': new FormControl(this.navTitle, [Validators.required])
      });
      this.loadingNavData = false;
    });
  }

  getBodyData() {
    return this.http.get('http://localhost:5000/bodydata', { responseType: 'json', observe: 'body' }).subscribe(data => {
      this.bodyData = data['data']['title'];
      this.descriptionData = data['data']['description'];
      this.editBodyForm = new FormGroup({
        'title': new FormControl(this.bodyData, [Validators.required]),
        'description': new FormControl(this.descriptionData, [Validators.required])
      });
      this.loadingBodyData = false;
    });
  }


  onSubmitNavData(): void {
    this.http.post('http://localhost:5000/navdata', { title: this.editNavForm.get('title').value }).subscribe(data => {
    location.reload();
    });
  }

  onSubmitBodyData(): void {
    this.http.post('http://localhost:5000/bodydata',
      { title: this.editBodyForm.get('title').value, description: this.editBodyForm.get('description').value })
      .subscribe(data => {
        this.toastr.success('Body data cambiado con exito');
      });
  }

}
