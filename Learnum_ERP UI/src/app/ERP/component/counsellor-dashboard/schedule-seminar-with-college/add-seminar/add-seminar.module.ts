import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddSeminarRoutingModule } from './add-seminar-routing.module';
import { AddSeminarComponent } from './add-seminar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
@NgModule({
  declarations: [AddSeminarComponent],
  imports: [
    CommonModule,
    AddSeminarRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule
  ]
})
export class AddSeminarModule { }
