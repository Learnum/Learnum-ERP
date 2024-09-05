import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticalProblemComponent } from './practical-problem.component';

const routes: Routes = [
  {
    path:'',
    component:PracticalProblemComponent,
    children:[
      {
        path:'',
        redirectTo:'practical-problem',
        pathMatch:'full'
      }, 
    ]
  },
  {
    path:'addpractical',
    loadChildren:()=>import('./addpractical/addpractical.module').then(m=>m.AddpracticalModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticalProblemRoutingModule { }
