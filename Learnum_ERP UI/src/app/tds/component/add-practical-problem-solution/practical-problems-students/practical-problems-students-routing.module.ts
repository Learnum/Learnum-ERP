import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticalProblemsStudentsComponent } from './practical-problems-students.component';

const routes: Routes = [
  {
    path:'',
    component:PracticalProblemsStudentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticalProblemsStudentsRoutingModule { }
