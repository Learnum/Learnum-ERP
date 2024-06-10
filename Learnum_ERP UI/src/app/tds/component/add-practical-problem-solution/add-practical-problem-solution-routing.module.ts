import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPracticalProblemSolutionComponent } from './add-practical-problem-solution.component';

const routes: Routes = [
  {
    path:'',
    component:AddPracticalProblemSolutionComponent,
    children: [
      {
        path: '',
        redirectTo: 'add-practical-problem-solution',
        pathMatch: 'full'
      },
    ],   
  },
  {
    path: 'practical-problems-students',
    loadChildren:() => import('./practical-problems-students/practical-problems-students.module').then(m => m.PracticalProblemsStudentsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPracticalProblemSolutionRoutingModule { }
