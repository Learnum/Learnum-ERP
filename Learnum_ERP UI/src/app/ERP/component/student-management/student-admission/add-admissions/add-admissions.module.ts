import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAdmissionsRoutingModule } from './add-admissions-routing.module';
import { AddAdmissionsComponent } from './add-admissions.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
@NgModule({
  declarations: [AddAdmissionsComponent],
  imports: [
    CommonModule,
    AddAdmissionsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule
  ]
})
export class AddAdmissionsModule { }
