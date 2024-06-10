import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CounsellorRoutingModule } from './counsellor-routing.module';
import { CounsellorComponent } from './counsellor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [
      CounsellorComponent
  ],
  imports: [
    CommonModule,
    CounsellorRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormsModule,
    FormlyModule.forRoot(),

  ]
})
export class CounsellorModule { }
