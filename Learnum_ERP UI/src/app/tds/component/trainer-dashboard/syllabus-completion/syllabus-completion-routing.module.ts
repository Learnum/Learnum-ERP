import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SyllabusCompletionComponent } from './syllabus-completion.component';

const routes: Routes = [
  {
    path:'',
    component:SyllabusCompletionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SyllabusCompletionRoutingModule { }
