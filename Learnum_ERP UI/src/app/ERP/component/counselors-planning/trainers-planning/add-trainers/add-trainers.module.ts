import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTrainersRoutingModule } from './add-trainers-routing.module';
import { AddTrainersComponent } from './add-trainers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

@NgModule({
  declarations: [AddTrainersComponent],
  imports: [
    CommonModule,
    AddTrainersRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule
  ]
})
export class AddTrainersModule { }
