import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticalProblemAnswerSheetComponent } from './practical-problem-answer-sheet.component';

const routes: Routes = [
  {
    path:'',
    component:PracticalProblemAnswerSheetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticalProblemAnswerSheetRoutingModule { }
