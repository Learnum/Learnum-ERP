import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentAddRoutingModule } from './student-add-routing.module';
import { StudentAddComponent } from './student-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyFieldFile } from '../../../masters/courses/add-courses/file-type.component';


@NgModule({
  declarations: [StudentAddComponent],
  imports: [
    CommonModule,
    StudentAddRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    FormlyModule.forRoot({
      types: [{ name: 'file', component: FormlyFieldFile, wrappers: ['form-field'] }],
    }),
    FormlyBootstrapModule
  ]
})
export class StudentAddModule { }
