import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MastersComponent } from './masters.component';

const routes: Routes = [
  {
    path: '',
    component: MastersComponent,

    children:[
      {
        path: '',
        redirectTo: 'branches',
        pathMatch: 'full'
      },
     
      {
        path:"branches",
        loadChildren:()=>
          import("./branches/branches.module").then(
            (m)=>m.BranchesModule
          ),
      },
      {
        path:"ip-address",
        loadChildren:()=>
          import("./ip-address/ip-address.module").then(
            (m)=>m.IpAddressModule
          ),
      },
      {
        path:"classrooms",
        loadChildren:()=>
          import("./classrooms/classrooms.module").then(
            (m)=>m.ClassroomsModule
          ),
      },
      {
        path:"courses",
        loadChildren:()=>
          import("./courses/courses.module").then(
            (m)=>m.CoursesModule
          ),
      },
      {
        path:"subjects",
        loadChildren:()=>
          import("./subjects/subjects.module").then(
            (m)=>m.SubjectsModule
          ),
      },
      {
        path:"batches",
        loadChildren:()=>
          import("./batches/batches.module").then(
            (m)=>m.BatchesModule
          ),
      },
    
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
