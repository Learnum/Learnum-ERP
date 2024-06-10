import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSubjectsComponent } from './add-subjects.component';

const routes: Routes = [
  {
    path: '',
    component: AddSubjectsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddSubjectsRoutingModule { }
