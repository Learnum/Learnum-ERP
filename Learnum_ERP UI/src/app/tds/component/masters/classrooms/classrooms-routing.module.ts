import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomsComponent } from './classrooms.component';

const routes: Routes = [
  {
    path: '',
    component: ClassroomsComponent,
    children: [
      {
        path: '',
        redirectTo: 'classrooms',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'add-classrooms',
    loadChildren: () => import('./add-classrooms/add-classrooms.module').then(m => m.AddClassroomsModule)

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomsRoutingModule { }
