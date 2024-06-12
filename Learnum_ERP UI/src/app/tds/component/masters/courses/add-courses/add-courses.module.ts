import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCoursesRoutingModule } from './add-courses-routing.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AddCoursesComponent } from './add-courses.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyFieldFile } from './file-type.component';
import { FileValueAccessor } from 'src/environments/file-value-accessor';

@NgModule({
  declarations: [AddCoursesComponent,FileValueAccessor,FormlyFieldFile],
  imports: [
    CommonModule,
    AddCoursesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyBootstrapModule,
    FormlyModule,
    FormlyModule.forRoot({
      types: [{ name: 'file', component: FormlyFieldFile, wrappers: ['form-field'] }],
    })
  ],
  bootstrap: [AddCoursesComponent],
})
export class AddCoursesModule { }
