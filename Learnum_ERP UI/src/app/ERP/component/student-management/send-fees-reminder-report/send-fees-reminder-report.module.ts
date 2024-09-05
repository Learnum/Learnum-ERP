import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendFeesReminderReportRoutingModule } from './send-fees-reminder-report-routing.module';
import { SendFeesReminderReportComponent } from './send-fees-reminder-report.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [
    SendFeesReminderReportComponent
  ],
  imports: [
    CommonModule,
    SendFeesReminderReportRoutingModule,
    SharedModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SendFeesReminderReportModule { }
