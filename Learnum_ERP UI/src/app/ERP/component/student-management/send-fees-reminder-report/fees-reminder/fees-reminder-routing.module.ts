import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeesReminderComponent } from './fees-reminder.component';

const routes: Routes = [
  {
    path:'',
    component:FeesReminderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesReminderRoutingModule { }
