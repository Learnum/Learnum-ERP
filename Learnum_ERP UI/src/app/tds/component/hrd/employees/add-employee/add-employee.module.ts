import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEmployeeComponent } from './add-employee.component';
import { AddEmployeeRoutingModule } from './add-employee-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
//import { BrowserModule } from '@angular/platform-browser';
//import { FileValueAccessor } from 'src/environments/file-value-accessor';
import { FormlyFieldFile } from './file-type.component';


@NgModule({
  declarations: [
       AddEmployeeComponent,FormlyFieldFile],
  imports: [
    //BrowserModule,
    CommonModule,
    AddEmployeeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      types: [{ name: 'file', component: FormlyFieldFile, wrappers: ['form-field'] }],
    })

  ]
})
export class AddEmployeeModule { }
