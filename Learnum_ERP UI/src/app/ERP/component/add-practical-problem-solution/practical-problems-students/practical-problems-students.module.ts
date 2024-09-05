import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PracticalProblemsStudentsRoutingModule } from './practical-problems-students-routing.module';
import { PracticalProblemsStudentsComponent } from './practical-problems-students.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyFieldFile } from '../../masters/courses/add-courses/file-type.component';
@NgModule({
  declarations: [PracticalProblemsStudentsComponent],
  imports: [
    CommonModule,
    PracticalProblemsStudentsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      types: [{ name: 'file', component: FormlyFieldFile, wrappers: ['form-field'] }],
    }),
  ]
})
export class PracticalProblemsStudentsModule { }
