import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentManagementComponent } from './student-management.component';

const routes: Routes = [
  {
    path:'',
    component:StudentManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'add-student',
        pathMatch: 'full'
      },
      {
        path: 'add-student',
        loadChildren: () =>
          import('./add-student/add-student.module').then(m => m.AddStudentModule),
      },
      {
        path: 'student-admission',
        loadChildren: () =>
          import('./student-admission/student-admission.module').then(m => m.StudentAdmissionModule),
      },
      {
        path: 'offline-fees-payment',
        loadChildren: () =>
          import('./offline-fees-payment/offline-fees-payment.module').then(m => m.OfflineFeesPaymentModule),
      },
      {
        path: 'send-fees-reminder-report',
        loadChildren: () =>
          import('./send-fees-reminder-report/send-fees-reminder-report.module').then(m => m.SendFeesReminderReportModule),
      },
      {
        path: 'student-admission-status',
        loadChildren: () =>
          import('./student-admission-status/student-admission-status.module').then(m => m.StudentAdmissionStatusModule),
      },
      {
        path: 'offline-fees-status',
        loadChildren: () =>
          import('./offline-fees-status/offline-fees-status.module').then(m => m.OfflineFeesStatusModule),
      },
    ]
  },
  {
    path: 'student-add',
    loadChildren: () =>
      import('./add-student/student-add/student-add.module').then(m => m.StudentAddModule),
  },
  {
    path: 'add-admissions',
    loadChildren: () =>
      import('./student-admission/add-admissions/add-admissions.module').then(m => m.AddAdmissionsModule),
  },
  {
    path: 'add-fees',
    loadChildren: () =>
      import('./offline-fees-payment/add-fees/add-fees.module').then(m => m.AddFeesModule),
  },
  {
    path: 'fees-reminder',
    loadChildren: () =>
      import('./send-fees-reminder-report/fees-reminder/fees-reminder.module').then(m => m.FeesReminderModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentManagementRoutingModule { }
