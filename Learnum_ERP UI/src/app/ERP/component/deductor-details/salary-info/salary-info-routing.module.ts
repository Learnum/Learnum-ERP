import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryInfoComponent } from './salary-info.component';

const routes: Routes = [
  {
    path: '',
    component: SalaryInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryInfoRoutingModule { }
