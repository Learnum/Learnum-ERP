import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallWithStudentLeadComponent } from './call-with-student-lead.component';

const routes: Routes = [
  {
    path: '',
    component: CallWithStudentLeadComponent,
    children: [
      {
        path: '',
        redirectTo: 'call-with-student-lead',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'call-with-student',
    loadChildren:() => import('./call-with-student/call-with-student.module').then(m => m.CallWithStudentModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallWithStudentLeadRoutingModule { }
