import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFeesComponent } from './add-fees.component';

const routes: Routes = [
  {
    path:'',
    component:AddFeesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddFeesRoutingModule { }
