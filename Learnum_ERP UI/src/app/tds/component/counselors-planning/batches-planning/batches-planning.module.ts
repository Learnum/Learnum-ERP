import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchesPlanningRoutingModule } from './batches-planning-routing.module';
import { BatchesPlanningComponent } from './batches-planning.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
@NgModule({
  declarations: [BatchesPlanningComponent],
  imports: [
    CommonModule,
    BatchesPlanningRoutingModule,
    SharedModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BatchesPlanningModule { }
