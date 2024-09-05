import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBusinessLeadComponent } from './add-business-lead.component';

const routes: Routes = [
  {
    path:'',
    component:AddBusinessLeadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddBusinessLeadRoutingModule { }
