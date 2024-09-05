import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddsyllabusComponent } from './addsyllabus.component';

const routes: Routes = [

  {
    path:'',
    component:AddsyllabusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddsyllabusRoutingModule { }
