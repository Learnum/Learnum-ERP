import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleMeetingWithCollegeComponent } from './schedule-meeting-with-college.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleMeetingWithCollegeComponent,
    children: [
      {
        path: '',
        redirectTo: 'schedule-meeting-with-college',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'add-meeting',
    loadChildren:() => import('./add-meeting/add-meeting.module').then(m => m.AddMeetingModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleMeetingWithCollegeRoutingModule { }
