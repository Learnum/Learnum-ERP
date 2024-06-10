import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { McqAssignmentsRoutingModule } from './mcq-assignments-routing.module';
import { McqAssignmentsComponent } from './mcq-assignments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

@NgModule({
  declarations: [
     McqAssignmentsComponent
  ],
  imports: [
    CommonModule,
    McqAssignmentsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyBootstrapModule

  ]
})
export class McqAssignmentsModule { }
