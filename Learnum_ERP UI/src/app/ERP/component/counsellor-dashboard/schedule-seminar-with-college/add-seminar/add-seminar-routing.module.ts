import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSeminarComponent } from './add-seminar.component';

const routes: Routes = [
  {
    path:'',
    component:AddSeminarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddSeminarRoutingModule { }
