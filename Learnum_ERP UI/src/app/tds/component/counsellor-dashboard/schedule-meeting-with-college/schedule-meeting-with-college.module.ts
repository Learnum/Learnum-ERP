import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleMeetingWithCollegeRoutingModule } from './schedule-meeting-with-college-routing.module';
import { ScheduleMeetingWithCollegeComponent } from './schedule-meeting-with-college.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
@NgModule({
  declarations: [ScheduleMeetingWithCollegeComponent],
  imports: [
    CommonModule,
    ScheduleMeetingWithCollegeRoutingModule,
    SharedModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ScheduleMeetingWithCollegeModule { }
