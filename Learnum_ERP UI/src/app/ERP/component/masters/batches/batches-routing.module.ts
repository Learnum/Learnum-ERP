import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchesComponent } from './batches.component';

const routes: Routes = [
  {
    path: '',
    component: BatchesComponent,
    children:[
      {
        path:'',
        redirectTo:'batches',
        pathMatch:'full'
      }, 
    ]
  },
  {
    path:'add-batches',
    loadChildren:()=>import('./add-batches/add-batches.module').then(m=>m.AddBatchesModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchesRoutingModule { }
