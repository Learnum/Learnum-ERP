import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchesPlanningComponent } from './batches-planning.component';

const routes: Routes = [
  {
    path:'',
    component:BatchesPlanningComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchesPlanningRoutingModule { }
