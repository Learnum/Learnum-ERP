import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { AddChallanComponent } from './add-challan.component';
import { AddChallanRoutingModule } from './add-challan-routing.module';




@NgModule({
  declarations: [AddChallanComponent],
  imports: [
    CommonModule,
    AddChallanRoutingModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    SharedModule,
    FormsModule,
    FormlyModule.forRoot(),
  ]
})
export class AddChallanModule { }
