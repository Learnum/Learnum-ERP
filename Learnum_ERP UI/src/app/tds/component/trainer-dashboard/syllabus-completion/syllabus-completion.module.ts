import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SyllabusCompletionRoutingModule } from './syllabus-completion-routing.module';
import { SyllabusCompletionComponent } from './syllabus-completion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
@NgModule({
  declarations: [SyllabusCompletionComponent],
  imports: [
    CommonModule,
    SyllabusCompletionRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule
  ]
})
export class SyllabusCompletionModule { }
