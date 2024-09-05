import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallWithStudentRoutingModule } from './call-with-student-routing.module';
import { CallWithStudentComponent } from './call-with-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
@NgModule({
  declarations: [CallWithStudentComponent],
  imports: [
    CommonModule,
    CallWithStudentRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule
  ]
})
export class CallWithStudentModule { }
