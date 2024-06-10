import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentAdmissionComponent } from './student-admission.component';

const routes: Routes = [
  {
    path:'',
    component:StudentAdmissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentAdmissionRoutingModule { }
