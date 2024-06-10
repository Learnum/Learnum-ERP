import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdmissionsComponent } from './add-admissions.component';

const routes: Routes = [
  {
    path:'',
    component:AddAdmissionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddAdmissionsRoutingModule { }
