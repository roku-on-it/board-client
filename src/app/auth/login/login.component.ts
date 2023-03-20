import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';

export interface LoginResponse {
  token: string;
}

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = new FormControl('', [Validators.email]);
  password = new FormControl('', [Validators.minLength(8)]);

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http
      .post<LoginResponse>('http://localhost:3000/auth/login', {
        email: this.email.value,
        password: this.password.value,
      })
      .pipe(untilDestroyed(this))
      .subscribe((response) => {
        localStorage.setItem('token', response.token);

        this.router.navigate(['candidates']);
      });
  }
}
