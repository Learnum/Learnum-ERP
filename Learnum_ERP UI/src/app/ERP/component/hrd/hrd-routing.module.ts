import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrdComponent } from './hrd.component';

const routes: Routes = [
  {
    path: '',
    component: HrdComponent,

    children:[
      {
        path: '',
        redirectTo: 'employee',
        pathMatch: 'full'
      },
     
      ]
  },
  {
    path:"employees",
    loadChildren:()=>
      import("./employees/employees.module").then(
        (m)=>m.EmployeesModule
      ),
  },
  
  {
    path:"trainer",
    loadChildren:()=>
      import("./trainer/trainer.module").then(
        (m)=>m.TrainerModule
      ),
  },
  {
    path:"branch-manager",
    loadChildren:()=>
      import("./branch-manager/branch-manager.module").then(
        (m)=>m.BranchManagerModule
      ),
  },
  {
    path:"content-writer",
    loadChildren:()=>
      import("./content-writer/content-writer.module").then(
        (m)=>m.ContentWriterModule
      ),
  },
  {
    path:"counsellor",
    loadChildren:()=>
      import("./counsellor/counsellor.module").then(
        (m)=>m.CounsellorModule
      ),
  },
  {
    path:"accountant",
    loadChildren:()=>
      import("./accountant/accountant.module").then(
        (m)=>m.AccountantModule
      ),
  },
  {
    path:"attendance",
    loadChildren:()=>
      import("./attendance/attendance.module").then(
        (m)=>m.AttendanceModule
      ),
  }, 
  {
    path:"daily-work",
    loadChildren:()=>
      import("./daily-work/daily-work.module").then(
        (m)=>m.DailyWorkModule
      ),
  },
  {
    path:"birthdays",
    loadChildren:()=>
      import("./birthdays/birthdays.module").then(
        (m)=>m.BirthdaysModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrdRoutingModule { }
