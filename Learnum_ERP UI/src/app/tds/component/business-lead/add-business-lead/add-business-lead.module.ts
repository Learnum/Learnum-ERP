import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBusinessLeadRoutingModule } from './add-business-lead-routing.module';
import { AddBusinessLeadComponent } from './add-business-lead.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
@NgModule({
  declarations: [AddBusinessLeadComponent],
  imports: [
    CommonModule,
    AddBusinessLeadRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule
  ]
})
export class AddBusinessLeadModule { }
