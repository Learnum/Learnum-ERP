import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCounsellorRoutingModule } from './add-counsellor-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { AddCounsellorComponent } from './add-counsellor.component';

@NgModule({
  declarations: [AddCounsellorComponent],
  imports: [
    CommonModule,
    AddCounsellorRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule
  ]
})
export class AddCounsellorModule { }
