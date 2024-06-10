import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounsellingWithStudentComponent } from './counselling-with-student.component';

const routes: Routes = [
  {
    path: '',
    component: CounsellingWithStudentComponent,
    children: [
      {
        path: '',
        redirectTo: 'counselling-with-student',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'counselling-student',
    loadChildren:() => import('./counselling-student/counselling-student.module').then(m => m.CounsellingStudentModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounsellingWithStudentRoutingModule { }
