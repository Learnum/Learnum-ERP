import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddBatchesRoutingModule } from './add-batches-routing.module';
import { AddBatchesComponent } from './add-batches.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [AddBatchesComponent],
  imports: [
    CommonModule,
    AddBatchesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyBootstrapModule,
    FormlyModule
  ]
})
export class AddBatchesModule { }
