import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounsellingStudentRoutingModule } from './counselling-student-routing.module';
import { CounsellingStudentComponent } from './counselling-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
@NgModule({
  declarations: [CounsellingStudentComponent],
  imports: [
    CommonModule,
    CounsellingStudentRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule
  ]
})
export class CounsellingStudentModule { }
