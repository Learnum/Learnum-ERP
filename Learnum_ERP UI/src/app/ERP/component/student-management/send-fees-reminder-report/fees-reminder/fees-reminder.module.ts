import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeesReminderRoutingModule } from './fees-reminder-routing.module';
import { FeesReminderComponent } from './fees-reminder.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

@NgModule({
  declarations: [FeesReminderComponent],
  imports: [
    CommonModule,
    FeesReminderRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule
  ]
})
export class FeesReminderModule { }
