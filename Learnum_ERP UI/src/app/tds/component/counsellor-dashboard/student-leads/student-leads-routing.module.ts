import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLeadsComponent } from './student-leads.component';

const routes: Routes = [
  {
    path: '',
    component: StudentLeadsComponent,
    children: [
      {
        path: '',
        redirectTo: 'schedule-meeting-with-college',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'add-student-leads',
    loadChildren:() => import('./add-student-leads/add-student-leads.module').then(m => m.AddStudentLeadsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentLeadsRoutingModule { }
