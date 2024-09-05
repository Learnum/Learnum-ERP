import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './attendance.component';

const routes: Routes = [
  {
    path: '',
    component: AttendanceComponent,
    children:[
      {
        path:'',
        redirectTo:'attendance',
        pathMatch:'full'
      }, 
    ]
  },
  {
    path:'add-record',
    loadChildren:()=>import('./add-record/add-record.module').then(m=>m.AddRecordModule)
  },
];
  


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
