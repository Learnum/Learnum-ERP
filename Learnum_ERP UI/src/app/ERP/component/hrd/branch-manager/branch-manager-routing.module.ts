import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchManagerComponent } from './branch-manager.component';

const routes: Routes = [
  {
    path: '',
    component: BranchManagerComponent,
    children:[
      {
        path:'',
        redirectTo:'branch-manager',
        pathMatch:'full'
      }, 
    ]
  },
  {
    path:'add-branch',
    loadChildren:()=>import('./add-branchManager/add-branch.module').then(m=>m.AddBranchModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchManagerRoutingModule { }
