import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPracticalExamComponent } from './my-practical-exam.component';

const routes: Routes = [
  {
    path:'',
    component:MyPracticalExamComponent,
    children: [
      {
        path: '',
        redirectTo: 'my-practical-exam',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'practical-problem-answer-sheet',
    loadChildren:() => import('./practical-problem-answer-sheet/practical-problem-answer-sheet.module').then(m => m.PracticalProblemAnswerSheetModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPracticalExamRoutingModule { }
