import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TDSLayoutComponent } from './tds-layout.component';


const routes: Routes = [
  {
    path: '',
    component: TDSLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TDSLayoutRoutingModule {}
