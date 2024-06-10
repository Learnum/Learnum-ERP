import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { GeneralExamRoutingModule } from './general-exam-routing.module';
import { GeneralExamComponent } from './general-exam.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

@NgModule({
  declarations: [
    GeneralExamComponent
  ],
  imports: [
    CommonModule,
    GeneralExamRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyBootstrapModule
  ]
})
export class GeneralExamModule { }
