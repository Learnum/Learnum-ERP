import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IpAddressComponent } from './ip-address.component';

const routes: Routes = [
  {
    path: '',
    component: IpAddressComponent,
    children: [
      {
        path: '',
        redirectTo: 'ip-address',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'add-ipaddress',
    loadChildren: () => import('./add-ipaddress/add-ipaddress.module').then(m => m.AddIpaddressModule)

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpAddressRoutingModule { }
