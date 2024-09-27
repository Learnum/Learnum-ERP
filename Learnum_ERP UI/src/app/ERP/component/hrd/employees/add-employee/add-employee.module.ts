import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { AddEmployeeRoutingModule } from './add-employee-routing.module';
import { AddEmployeeComponent } from './add-employee.component';
import { FormlyFieldFile } from '../../../masters/courses/add-courses/file-type.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AddEmployeeComponent],
  imports: [
    CommonModule,
    AddEmployeeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      types: [{ name: 'file', component: FormlyFieldFile, wrappers: ['form-field'] }],
    })]
})
export class AddEmployeeModule { }

