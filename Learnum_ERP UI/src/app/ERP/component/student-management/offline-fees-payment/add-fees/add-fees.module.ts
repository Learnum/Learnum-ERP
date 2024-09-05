import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddFeesRoutingModule } from './add-fees-routing.module';
import { AddFeesComponent } from './add-fees.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
@NgModule({
  declarations: [AddFeesComponent],
  imports: [
    CommonModule,
    AddFeesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule
  ]
})
export class AddFeesModule { }
