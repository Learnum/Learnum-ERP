import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralExamComponent } from './general-exam.component';

const routes: Routes = [
 {
  path:'',
  component:GeneralExamComponent,
  children:[
    {
      path:'',
      redirectTo:'general-exam',
      pathMatch:'full'
    }, 
  ]
},
{
  path:'addgeneralexam',
  loadChildren:()=>import('./addgeneralexam/addgeneralexam.module').then(m=>m.AddgeneralexamModule)
},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralExamRoutingModule { }
