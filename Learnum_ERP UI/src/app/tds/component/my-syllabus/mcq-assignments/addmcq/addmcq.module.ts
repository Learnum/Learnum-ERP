import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddmcqRoutingModule } from './addmcq-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { AddmcqComponent } from './addmcq.component';
import { NgModel } from '@angular/forms';

@NgModule({
  declarations: [AddmcqComponent],
  imports: [
    CommonModule,
    AddmcqRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule,
  ]
})
export class AddmcqModule { }
