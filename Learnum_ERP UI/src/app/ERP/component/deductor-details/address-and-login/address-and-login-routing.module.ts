import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressAndLoginComponent } from './address-and-login.component';


const routes: Routes = [
    {
      path: '',
      component: AddressAndLoginComponent,
    },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class AddressAndLoginRoutingModule {}