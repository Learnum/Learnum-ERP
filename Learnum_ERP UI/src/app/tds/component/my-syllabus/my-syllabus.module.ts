import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySyllabusRoutingModule } from './my-syllabus-routing.module';
import { MySyllabusComponent } from './my-syllabus.component';
import { SharedModule } from 'src/app/shared/shared.module';
//import { MySyllabusErpComponent } from './my-syllabus-erp/my-syllabus-erp.component';
// import { MyexamComponent } from './myexam/myexam.component';
// import { McqAssignmentsComponent } from './mcq-assignments/mcq-assignments.component';
// import { PracticalProblemComponent } from './practical-problem/practical-problem.component';
// import { GeneralExamComponent } from './general-exam/general-exam.component';


@NgModule({
  declarations: [
   MySyllabusComponent,
   // MySyllabusErpComponent,
    // MyexamComponent,
    // McqAssignmentsComponent,
    // PracticalProblemComponent,
    // GeneralExamComponent
  ],
  imports: [
    CommonModule,
    MySyllabusRoutingModule,
    SharedModule
  ]
})
export class MySyllabusModule { }
