import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentLeadsRoutingModule } from './student-leads-routing.module';
import { StudentLeadsComponent } from './student-leads.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
@NgModule({
  declarations: [
    StudentLeadsComponent
  ],
  imports: [
    CommonModule,
    StudentLeadsRoutingModule,
    SharedModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StudentLeadsModule { }
