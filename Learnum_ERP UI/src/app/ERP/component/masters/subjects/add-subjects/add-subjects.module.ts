import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddSubjectsRoutingModule } from './add-subjects-routing.module';
import { FormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { AddSubjectsComponent } from './add-subjects.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddSubjectsComponent],
  imports: [
    CommonModule,
    AddSubjectsRoutingModule,
    SharedModule,
    FormsModule,
    FormlyBootstrapModule,
    FormlyModule,
    ReactiveFormsModule
  ]
})
export class AddSubjectsModule { }
