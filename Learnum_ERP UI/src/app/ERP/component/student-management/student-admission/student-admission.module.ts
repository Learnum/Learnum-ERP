import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentAdmissionRoutingModule } from './student-admission-routing.module';
import { StudentAdmissionComponent } from './student-admission.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [StudentAdmissionComponent],
  imports: [
    CommonModule,
    StudentAdmissionRoutingModule,
    SharedModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentAdmissionModule { }
