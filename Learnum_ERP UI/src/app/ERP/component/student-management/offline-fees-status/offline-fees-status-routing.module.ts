import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfflineFeesStatusComponent } from './offline-fees-status.component';

const routes: Routes = [
  {
    path:'',
    component:OfflineFeesStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfflineFeesStatusRoutingModule { }
