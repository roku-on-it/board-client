import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatesRoutingModule } from './candidates-routing.module';
import { CandidatesComponent } from './candidates.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CandidatesComponent],
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class CandidatesModule {}
