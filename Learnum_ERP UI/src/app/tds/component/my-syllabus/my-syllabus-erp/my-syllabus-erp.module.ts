import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MySyllabusErpRoutingModule } from './my-syllabus-erp-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { MySyllabusErpComponent } from './my-syllabus-erp.component';

@NgModule({
  declarations: [
   MySyllabusErpComponent
  ],
  imports: [
    CommonModule,
    MySyllabusErpRoutingModule,
    SharedModule,
    FormlyModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyBootstrapModule
  ]
})
export class MySyllabusErpModule { }
