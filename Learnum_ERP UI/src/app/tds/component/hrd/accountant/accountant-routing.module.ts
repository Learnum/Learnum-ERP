import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountantComponent } from './accountant.component';

const routes: Routes = [
  {
    path: '',
    component: AccountantComponent,
    children:[
      {
        path:'',
        redirectTo:'accountant',
        pathMatch:'full'
      }, 
    ]
  },
  {
    path:'add-accountant',
    loadChildren:()=>import('./add-accountant/add-accountant.module').then(m=>m.AddAccountantModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountantRoutingModule { }
