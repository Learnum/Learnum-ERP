import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentAdmissionStatusRoutingModule } from './student-admission-status-routing.module';
import { StudentAdmissionStatusComponent } from './student-admission-status.component';

@NgModule({
  declarations: [StudentAdmissionStatusComponent],
  imports: [
    CommonModule,
    StudentAdmissionStatusRoutingModule
  ]
})
export class StudentAdmissionStatusModule { }
