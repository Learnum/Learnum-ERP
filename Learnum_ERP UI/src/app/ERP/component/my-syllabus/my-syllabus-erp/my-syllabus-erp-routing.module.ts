import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MySyllabusErpComponent } from './my-syllabus-erp.component';

const routes: Routes = [
  {
    path:'',
    component:MySyllabusErpComponent,
    children:[
      {
        path:'',
        redirectTo:'my-syllabus-erp',
        pathMatch:'full'
      }, 
    ]
  },
  {
    path:'addsyllabus',
    loadChildren:()=>import('./addsyllabus/addsyllabus.module').then(m=>m.AddsyllabusModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MySyllabusErpRoutingModule { }
