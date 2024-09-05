import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddmcqComponent } from './addmcq.component';

const routes: Routes = [
  {
    path:'',
    component:AddmcqComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddmcqRoutingModule { }
