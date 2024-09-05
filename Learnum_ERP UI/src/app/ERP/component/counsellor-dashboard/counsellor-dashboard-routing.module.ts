import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounsellorDashboardComponent } from './counsellor-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: CounsellorDashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'colleges',
        pathMatch: 'full'
      },
      {
        path: 'colleges',
        loadChildren: () =>
          import('./colleges/colleges.module').then(m => m.CollegesModule),
      },
      {
        path: 'schedule-meeting-with-college',
        loadChildren: () =>
          import('./schedule-meeting-with-college/schedule-meeting-with-college.module').then(m => m.ScheduleMeetingWithCollegeModule),
      },
      {
        path: 'schedule-seminar-with-college',
        loadChildren: () =>
          import('./schedule-seminar-with-college/schedule-seminar-with-college.module').then(m => m.ScheduleSeminarWithCollegeModule),
      },
      {
        path: 'student-leads',
        loadChildren: () =>
          import('./student-leads/student-leads.module').then(m => m.StudentLeadsModule),
      },
      {
        path: 'website-leads',
        loadChildren: () =>
          import('./website-leads/website-leads.module').then(m => m.WebsiteLeadsModule),
      },
      {
        path: 'call-with-student-lead',
        loadChildren: () =>
          import('./call-with-student-lead/call-with-student-lead.module').then(m => m.CallWithStudentLeadModule),
      },
      {
        path: 'counselling-with-student',
        loadChildren: () =>
          import('./counselling-with-student/counselling-with-student.module').then(m => m.CounsellingWithStudentModule),
      },
    ],
  },
  {
    path: 'add-collegs',
    loadChildren: () =>
      import('./colleges/add-collegs/add-collegs.module').then(m => m.AddCollegsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounsellorDashboardRoutingModule { }
