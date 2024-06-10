import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { IpAddressRoutingModule } from './ip-address-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { IpAddressComponent } from './ip-address.component';

@NgModule({
  declarations: [
     IpAddressComponent
  ],
  imports: [
    CommonModule,
    IpAddressRoutingModule,
    FormsModule,
    FormlyBootstrapModule,
    ReactiveFormsModule,
    FormlyModule,
    SharedModule
  ]
})
export class IpAddressModule { }
