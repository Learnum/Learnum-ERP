import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddIpaddressComponent } from './add-ipaddress.component';

const routes: Routes = [
  {
    path: '',
    component: AddIpaddressComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddIpaddressRoutingModule { }
