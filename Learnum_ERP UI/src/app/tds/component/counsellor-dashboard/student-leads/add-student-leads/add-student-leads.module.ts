import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddStudentLeadsRoutingModule } from './add-student-leads-routing.module';
import { AddStudentLeadsComponent } from './add-student-leads.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
@NgModule({
  declarations: [AddStudentLeadsComponent],
  imports: [
    CommonModule,
    AddStudentLeadsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule
  ]
})
export class AddStudentLeadsModule { }
