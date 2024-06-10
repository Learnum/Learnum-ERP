import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounsellorComponent } from './counsellor.component';

const routes: Routes = [
  {
    path: '',
    component: CounsellorComponent,
    children:[
      {
        path:'',
        redirectTo:'counsellor',
        pathMatch:'full'
      }, 
    ]
  },
  {
    path:'add-counsellor',
    loadChildren:()=>import('./add-counsellor/add-counsellor.module').then(m=>m.AddCounsellorModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounsellorRoutingModule { }
