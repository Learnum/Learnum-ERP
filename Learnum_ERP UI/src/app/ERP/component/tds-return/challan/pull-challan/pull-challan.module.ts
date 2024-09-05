import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { PullChallanRoutingModule } from './pull-challan-routing.module';
import { PullChallanComponent } from './pull-challan.component';





@NgModule({
  declarations: [PullChallanComponent],
  imports: [
    CommonModule,
    PullChallanRoutingModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    SharedModule,
    FormsModule,
    FormlyModule.forRoot(),
  ]
})
export class PullChallanModule { }
