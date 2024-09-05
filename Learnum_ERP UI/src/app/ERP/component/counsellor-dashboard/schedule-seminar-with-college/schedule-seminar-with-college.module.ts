import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleSeminarWithCollegeRoutingModule } from './schedule-seminar-with-college-routing.module';
import { ScheduleSeminarWithCollegeComponent } from './schedule-seminar-with-college.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
@NgModule({
  declarations: [ScheduleSeminarWithCollegeComponent],
  imports: [
    CommonModule,
    ScheduleSeminarWithCollegeRoutingModule,
    SharedModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ScheduleSeminarWithCollegeModule { }
