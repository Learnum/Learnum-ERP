import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddMeetingRoutingModule } from './add-meeting-routing.module';
import { AddMeetingComponent } from './add-meeting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
@NgModule({
  declarations: [AddMeetingComponent],
  imports: [
    CommonModule,
    AddMeetingRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule
  ]
})
export class AddMeetingModule { }
