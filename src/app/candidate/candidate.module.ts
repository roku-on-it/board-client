import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { CandidateComponent } from './candidate.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CandidateComponent],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class CandidateModule {}
