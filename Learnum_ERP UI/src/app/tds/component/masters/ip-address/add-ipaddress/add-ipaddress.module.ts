import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddIpaddressRoutingModule } from './add-ipaddress-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { AddIpaddressComponent } from './add-ipaddress.component';

@NgModule({
  declarations: [AddIpaddressComponent],
  imports: [
    CommonModule,
    AddIpaddressRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyBootstrapModule,
    FormlyModule,
    SharedModule,
    FormlyModule.forRoot(),
  ],
  providers : [
  
  ]
})
export class AddIpaddressModule { }
