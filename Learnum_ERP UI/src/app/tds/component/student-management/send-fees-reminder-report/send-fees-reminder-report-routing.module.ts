import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendFeesReminderReportComponent } from './send-fees-reminder-report.component';


const routes: Routes = [
  {
    path:'',
    component:SendFeesReminderReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendFeesReminderReportRoutingModule { }
