import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCoursesRoutingModule } from './add-courses-routing.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AddCoursesComponent } from './add-courses.component';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [AddCoursesComponent],
  imports: [
    CommonModule,
    AddCoursesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyBootstrapModule,
    FormlyModule

  ]
})
export class AddCoursesModule { }
