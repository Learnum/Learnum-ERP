import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpracticalComponent } from './addpractical.component';

const routes: Routes = [
  {
    path:'',
    component:AddpracticalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddpracticalRoutingModule { }
