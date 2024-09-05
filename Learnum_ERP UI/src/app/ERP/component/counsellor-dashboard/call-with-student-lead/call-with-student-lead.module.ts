import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallWithStudentLeadRoutingModule } from './call-with-student-lead-routing.module';
import { CallWithStudentLeadComponent } from './call-with-student-lead.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
@NgModule({
  declarations: [CallWithStudentLeadComponent],
  imports: [
    CommonModule,
    CallWithStudentLeadRoutingModule,
    SharedModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CallWithStudentLeadModule { }
