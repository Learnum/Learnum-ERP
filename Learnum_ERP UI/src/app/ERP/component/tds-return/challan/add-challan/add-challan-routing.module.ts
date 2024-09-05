import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddChallanComponent } from './add-challan.component';

const routes: Routes = [
    {
      path: '',
      component: AddChallanComponent,
    },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class AddChallanRoutingModule {}