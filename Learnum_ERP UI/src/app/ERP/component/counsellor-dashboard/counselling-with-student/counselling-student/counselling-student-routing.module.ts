import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounsellingStudentComponent } from './counselling-student.component';

const routes: Routes = [
  {
    path:'',
    component:CounsellingStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounsellingStudentRoutingModule { }
