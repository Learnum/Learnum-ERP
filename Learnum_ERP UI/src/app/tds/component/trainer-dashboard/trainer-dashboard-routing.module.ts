import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerDashboardComponent } from './trainer-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: TrainerDashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'syllabus-completion',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'syllabus-completion',
    loadChildren: () =>
      import('./syllabus-completion/syllabus-completion.module').then(
        (m) => m.SyllabusCompletionModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerDashboardRoutingModule { }
