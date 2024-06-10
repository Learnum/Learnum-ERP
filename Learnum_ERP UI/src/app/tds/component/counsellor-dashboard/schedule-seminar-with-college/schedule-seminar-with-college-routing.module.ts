import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleSeminarWithCollegeComponent } from './schedule-seminar-with-college.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleSeminarWithCollegeComponent,
    children: [
      {
        path: '',
        redirectTo: 'schedule-seminar-with-college',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'add-seminar',
    loadChildren:() => import('./add-seminar/add-seminar.module').then(m => m.AddSeminarModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleSeminarWithCollegeRoutingModule { }
