import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { McqAssignmentsComponent } from './mcq-assignments.component';

const routes: Routes = [
  {
    path:'',
    component:McqAssignmentsComponent,
    children:[
      {
        path:'',
        redirectTo:'mcq-assignments',
        pathMatch:'full'
      }, 
    ]
  },
  {
    path:'addmcq',
    loadChildren:()=>import('./addmcq/addmcq.module').then(m=>m.AddmcqModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class McqAssignmentsRoutingModule { }
