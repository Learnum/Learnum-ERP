import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainersPlanningComponent } from './trainers-planning.component';

const routes: Routes = [
  {
    path:'',
    component:TrainersPlanningComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainersPlanningRoutingModule { }
