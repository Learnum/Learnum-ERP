import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulePracticalProblemComponent } from './schedule-practical-problem.component';

const routes: Routes = [
  {
    path:'',
    component:SchedulePracticalProblemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulePracticalProblemRoutingModule { }
