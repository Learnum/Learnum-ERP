import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddgeneralexamComponent } from './addgeneralexam.component';

const routes: Routes = [
  {
    path:'',
    component:AddgeneralexamComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddgeneralexamRoutingModule { }
