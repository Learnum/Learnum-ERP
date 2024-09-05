import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBirthdayRoutingModule } from './add-birthday-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { AddBirthdayComponent } from './add-birthday.component';

@NgModule({
  declarations: [AddBirthdayComponent],
  imports: [
    CommonModule,
    AddBirthdayRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule
  ]
})
export class AddBirthdayModule { }
