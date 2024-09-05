import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PullChallanComponent } from './pull-challan.component';

const routes: Routes = [
    {
      path: '',
      component: PullChallanComponent,
    },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class PullChallanRoutingModule {}