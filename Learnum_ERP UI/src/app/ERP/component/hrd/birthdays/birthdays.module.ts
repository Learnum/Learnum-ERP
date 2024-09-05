import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirthdaysRoutingModule } from './birthdays-routing.module';
import { BirthdaysComponent } from './birthdays.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [
    BirthdaysComponent
  ],
  imports: [
    CommonModule,
    BirthdaysRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormsModule,
    FormlyModule.forRoot(),
  ]
})
export class BirthdaysModule { }
