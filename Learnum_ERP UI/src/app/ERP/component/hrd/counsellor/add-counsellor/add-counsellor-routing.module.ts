import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCounsellorComponent } from './add-counsellor.component';

const routes: Routes = [
  {
    path: '',
    component : AddCounsellorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCounsellorRoutingModule { }
