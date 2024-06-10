import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBatchRoutingModule } from './add-batch-routing.module';
import { AddBatchComponent } from './add-batch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

@NgModule({
  declarations: [AddBatchComponent],
  imports: [
    CommonModule,
    AddBatchRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule,
  ]
})
export class AddBatchModule { }
