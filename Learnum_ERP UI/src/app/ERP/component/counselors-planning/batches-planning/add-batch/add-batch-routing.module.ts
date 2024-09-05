import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBatchComponent } from './add-batch.component';

const routes: Routes = [
  {
    path:'',
    component:AddBatchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddBatchRoutingModule { }
