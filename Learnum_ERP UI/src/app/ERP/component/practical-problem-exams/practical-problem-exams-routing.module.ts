import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticalProblemExamsComponent } from './practical-problem-exams.component';

const routes: Routes = [
  {
    path:'',
    component:PracticalProblemExamsComponent
  },
  {
    path: 'schedule-practical-problem',
    loadChildren:() => import('./schedule-practical-problem/schedule-practical-problem.module').then(m => m.SchedulePracticalProblemModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticalProblemExamsRoutingModule { }
