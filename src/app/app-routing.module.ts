import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'candidates',
        loadChildren: () =>
          import('./candidates/candidates.module').then(
            (m) => m.CandidatesModule
          ),
      },
      {
        path: 'candidates/:id',
        loadChildren: () =>
          import('./candidate/candidate.module').then((m) => m.CandidateModule),
      },
      { path: '**', redirectTo: 'auth' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
