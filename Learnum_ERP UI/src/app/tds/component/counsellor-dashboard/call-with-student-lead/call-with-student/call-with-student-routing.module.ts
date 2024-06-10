import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallWithStudentComponent } from './call-with-student.component';

const routes: Routes = [
  {
    path:'',
    component:CallWithStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallWithStudentRoutingModule { }
