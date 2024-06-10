import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MySyllabusComponent } from './my-syllabus.component';
import { MySyllabusErpModule } from './my-syllabus-erp/my-syllabus-erp.module';

const routes: Routes = [
  {
    path: '',
    component: MySyllabusComponent,

    children:[
      {
        path: '',
        redirectTo: 'my-syllabus',
        pathMatch: 'full'
      },
     
      ]
  },
  {
    path:"my-syllabus-erp",
    loadChildren:()=>
      import("./my-syllabus-erp/my-syllabus-erp.module").then(
        (m)=>MySyllabusErpModule
      ),
  },
  
  {
    path:"myexam",
    loadChildren:()=>
      import("./myexam/myexam.module").then(
        (m)=>m.MyexamModule
      ),
  },
  {
    path:"mcq-assignments",
    loadChildren:()=>
      import("./mcq-assignments/mcq-assignments.module").then(
        (m)=>m.McqAssignmentsModule
      ),
  },
  {
    path:"practical-problem",
    loadChildren:()=>
      import("./practical-problem/practical-problem.module").then(
        (m)=>m.PracticalProblemModule
      ),
  },
  {
    path:"general-exam",
    loadChildren:()=>
      import("./general-exam/general-exam.module").then(
        (m)=>m.GeneralExamModule
      ),
  },  
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MySyllabusRoutingModule { }
