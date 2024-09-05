import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { ChallanComponent } from './challan.component';
import { ChallanRoutingModule } from './challan-routing.module';



@NgModule({
  declarations: [ChallanComponent],
  imports: [
    CommonModule,
    ChallanRoutingModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    SharedModule,
    FormsModule,
    FormlyModule.forRoot(),
  ]
})
export class ChallanModule { }
