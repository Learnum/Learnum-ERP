import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchesComponent } from './branches.component';

const routes: Routes = [
  {
    path: '',
    component: BranchesComponent,
    children: [
      {
        path: '',
        redirectTo: 'branches',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'add-branch',
    loadChildren: () => import('./add-branch/add-branch.module').then(m => m.AddBranchModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesRoutingModule { }
