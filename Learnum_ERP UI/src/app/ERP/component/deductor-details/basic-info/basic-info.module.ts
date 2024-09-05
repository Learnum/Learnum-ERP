import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicInfoComponent } from './basic-info.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BasicInfoRoutingModule } from './basic-info-routing.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';



@NgModule({
  declarations: [BasicInfoComponent],
  imports: [
    CommonModule,
    BasicInfoRoutingModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    SharedModule,
    FormsModule,
    FormlyModule.forRoot(),
  ]
})
export class BasicInfoModule { }
