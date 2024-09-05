import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfflineFeesPaymentComponent } from './offline-fees-payment.component';

const routes: Routes = [
  {
    path:'',
    component:OfflineFeesPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfflineFeesPaymentRoutingModule { }
