import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddpracticalRoutingModule } from './addpractical-routing.module';
import { AddpracticalComponent } from './addpractical.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

@NgModule({
  declarations: [AddpracticalComponent],
  imports: [
    CommonModule,
    AddpracticalRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyBootstrapModule
  ]
})
export class AddpracticalModule { }
