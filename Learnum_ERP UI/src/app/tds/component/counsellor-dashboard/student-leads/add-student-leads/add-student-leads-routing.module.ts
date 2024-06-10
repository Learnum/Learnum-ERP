import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentLeadsComponent } from './add-student-leads.component';

const routes: Routes = [
  {
    path: '',
    component:AddStudentLeadsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddStudentLeadsRoutingModule { }
