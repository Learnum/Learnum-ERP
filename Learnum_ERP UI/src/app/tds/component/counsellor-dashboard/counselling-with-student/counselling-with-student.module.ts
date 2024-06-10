import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounsellingWithStudentRoutingModule } from './counselling-with-student-routing.module';
import { CounsellingWithStudentComponent } from './counselling-with-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
@NgModule({
  declarations: [CounsellingWithStudentComponent],
  imports: [
    CommonModule,
    CounsellingWithStudentRoutingModule,
    SharedModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CounsellingWithStudentModule { }
