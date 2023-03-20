import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private http: HttpClient, private router: Router) {}

  email = new FormControl('email@domain.com');
  password = new FormControl('secretPass');
  name = new FormControl('Lorem Ipsum');
  candidateDescription = new FormControl('Best DEV ever');
  candidateEmail = new FormControl('mycustom@email.com');
  candidateTechStack = new FormControl('NestJS Angular');
  candidateSalary = new FormControl(999999);
  candidatePosition = new FormControl('Backend Dev');
  profileType = new FormControl(0);

  register() {
    this.http
      .post('http://localhost:3000/auth/register', {
        email: this.email.value,
        password: this.password.value,
        name: this.name.value,
        profileType: this.profileType.value,
        // Conditional object assignment.
        ...(this.profileType.value === 0 && {
          candidateDescription: this.candidateDescription.value,
          candidateEmail: this.candidateEmail.value,
          candidateTechStack: this.candidateTechStack.value,
          candidateSalary: this.candidateSalary.value,
          candidatePosition: this.candidatePosition.value,
        }),
      })
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.router.navigate(['auth/login']);
      });
  }
}
