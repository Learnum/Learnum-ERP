import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClassroomsComponent } from './add-classrooms.component';

const routes: Routes = [
  {
    path: '',
    component: AddClassroomsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddClassroomsRoutingModule { }
