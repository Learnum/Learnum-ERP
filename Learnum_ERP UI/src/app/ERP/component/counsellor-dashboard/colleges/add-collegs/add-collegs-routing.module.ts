import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCollegsComponent } from './add-collegs.component';

const routes: Routes = [
  {
    path: '',
    component: AddCollegsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCollegsRoutingModule { }
