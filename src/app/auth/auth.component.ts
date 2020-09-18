import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  loginForm: FormGroup;
  errorMessage: string = "";

  ngOnInit(): void {
    if (this.authService.islogged) {
      this.router.navigate(['/'])
    }
    this.loginForm = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', Validators.required)
    });
    // this.authService.login('hola', 'olis50');
  }

  onSubmit() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(data => {
      this.authService.setSession(data['data']);
      this.router.navigate(['/'])
    }, error => {
      this.errorMessage = error.error.message
      console.log(this.errorMessage);
    });
  }
}
