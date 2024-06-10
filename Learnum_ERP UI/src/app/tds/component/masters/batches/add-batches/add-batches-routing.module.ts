import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBatchesComponent } from './add-batches.component';

const routes: Routes = [
  {
    path:'',
    component:AddBatchesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddBatchesRoutingModule { }
