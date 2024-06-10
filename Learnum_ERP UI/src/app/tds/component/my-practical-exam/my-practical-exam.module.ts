import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule} from '@angular/common';

import { MyPracticalExamRoutingModule } from './my-practical-exam-routing.module';
import { MyPracticalExamComponent } from './my-practical-exam.component';
//import { PracticalProblemAnswerSheetComponent } from './practical-problem-answer-sheet/practical-problem-answer-sheet.component';
//import { MyPracticalExamReportsComponent } from './my-practical-exam-reports/my-practical-exam-reports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [
    //PracticalProblemAnswerSheetComponent,
    //MyPracticalExamReportsComponent
    MyPracticalExamComponent
  ],
  imports: [
    CommonModule,
    MyPracticalExamRoutingModule,
    SharedModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class MyPracticalExamModule { }
