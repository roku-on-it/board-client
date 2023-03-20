import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, map, Observable } from 'rxjs';
import { User } from '../candidates/candidates.component';
import { FormControl } from '@angular/forms';

export interface Message {
  id: string;
  fromId: number;
  fromName: string;
  content: string;
}

@UntilDestroy()
@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent {
  candidate!: User;
  messages!: Observable<Message[]>;
  me!: Observable<User>;
  messageFormControl = new FormControl();

  constructor(private http: HttpClient, router: ActivatedRoute) {
    router.params.pipe(untilDestroyed(this)).subscribe((params) => {
      this.me = this.http.get<User>('http://localhost:3000/user/me');
      this.http
        .get<User>(`http://localhost:3000/user/candidates/${params['id']}`)
        .pipe(untilDestroyed(this))
        .subscribe((candidate) => {
          this.candidate = candidate;
        });
      this.messages = this.http
        .get<any>(`http://localhost:3000/message/get-chat/${params['id']}`)
        .pipe(
          map((res) => res.messages),
          catchError(() => {
            return this.http.post<any>(
              'http://localhost:3000/message/create-room',
              {
                userId: +params['id'],
              },
            );
          }),
        );
    });
  }

  sendMessage(recipientId: number) {
    this.http
      .post<any>('http://localhost:3000/message/send-message', {
        recipient: recipientId,
        content: this.messageFormControl.value,
      })
      .subscribe(() => {
        this.messages = this.http
          .get<any>(`http://localhost:3000/message/get-chat/${recipientId}`)
          .pipe(map((res) => res.messages));
      });
  }
}
