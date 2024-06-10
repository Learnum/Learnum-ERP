import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children:[
      {
        path:'',
        redirectTo:'courses',
        pathMatch:'full'
      }, 
    ]
  },
  {
    path:'add-courses',
    loadChildren:()=>import('./add-courses/add-courses.module').then(m=>m.AddCoursesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
