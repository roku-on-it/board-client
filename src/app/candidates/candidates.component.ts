import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  candidateProfile: CandidateProfile;
}

interface CandidateProfile {
  email: string;
  salary: number;
  position: string;
  stack: string;
  description: string;
}

@UntilDestroy()
@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent {
  candidates: User[] = [];

  constructor(private http: HttpClient) {
    this.http
      .get<User[]>('http://localhost:3000/user/candidates')
      .pipe(untilDestroyed(this))
      .subscribe((candidates) => {
        this.candidates = candidates;
      });
  }
}
