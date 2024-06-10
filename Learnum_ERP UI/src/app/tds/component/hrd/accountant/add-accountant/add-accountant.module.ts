import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAccountantRoutingModule } from './add-accountant-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { AddAccountantComponent } from './add-accountant.component';

@NgModule({
  declarations: [AddAccountantComponent],
  imports: [
    CommonModule,
    AddAccountantRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule
  ]
})
export class AddAccountantModule { }
