import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticalProblemsStudentsRoutingModule } from './practical-problems-students-routing.module';
import { PracticalProblemsStudentsComponent } from './practical-problems-students.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
@NgModule({
  declarations: [PracticalProblemsStudentsComponent],
  imports: [
    CommonModule,
    PracticalProblemsStudentsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule
  ]
})
export class PracticalProblemsStudentsModule { }
