import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddRecordRoutingModule } from './add-record-routing.module';
import { AddRecordComponent } from './add-record.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';


@NgModule({
  declarations: [AddRecordComponent],
  imports: [
    CommonModule,
    AddRecordRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule

  ]
})
export class AddRecordModule { }
