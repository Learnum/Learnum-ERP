import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TDSRETURNComponent } from './tds-return.component';

const routes: Routes = [
  {
    path: '',
    component: TDSRETURNComponent,
    children: [
      {
        path: '',
        redirectTo: 'challan',
        pathMatch: 'full'
      },
      {
        path: 'challan',
        loadChildren:() => import('./challan/challan.module').then(m => m.ChallanModule)
      },
     
      {
        path: 'review-uplaod',
        loadChildren:() => import('./review & upload/review-upload.module').then(m => m.ReviewUploadModule)
      },

    ]
  },
  {
    path: 'add-challan',
    loadChildren:() => import('./challan/add-challan/add-challan.module').then(m => m.AddChallanModule)
  },
  {
    path: 'pull-challan',
    loadChildren:() => import('./challan/pull-challan/pull-challan.module').then(m => m.PullChallanModule)
  },
  {
    path: 'upload-exel',
    loadChildren:() => import('./challan/upload-exel/upload-exel.module').then(m => m.UploadExelModule)
    },
   


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TDSRETURNRoutingModule {}
