import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTrainersComponent } from './add-trainers.component';

const routes: Routes = [
  {
    path:'',
    component:AddTrainersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddTrainersRoutingModule { }
