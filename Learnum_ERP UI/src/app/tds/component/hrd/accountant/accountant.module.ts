import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountantRoutingModule } from './accountant-routing.module';
import { AccountantComponent } from './accountant.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [
    AccountantComponent
  ],
  imports: [
    CommonModule,
    AccountantRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormsModule,
    FormlyModule.forRoot(),
  ]
})
export class AccountantModule { }
