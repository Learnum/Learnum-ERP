import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentAdmissionStatusComponent } from './student-admission-status.component';

const routes: Routes = [
  {
    path:'',
    component:StudentAdmissionStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentAdmissionStatusRoutingModule { }
