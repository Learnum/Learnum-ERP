import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyDashboardERPComponent } from './my-dashboard-erp.component';

const routes: Routes = [
  {
    path: '',
    component: MyDashboardERPComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyDashboardErpRoutingModule { }
