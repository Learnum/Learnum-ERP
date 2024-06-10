import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticalProblemAnswerSheetRoutingModule } from './practical-problem-answer-sheet-routing.module';
import { PracticalProblemAnswerSheetComponent } from './practical-problem-answer-sheet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
@NgModule({
  declarations: [PracticalProblemAnswerSheetComponent],
  imports: [
    CommonModule,
    PracticalProblemAnswerSheetRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule
  ]
})
export class PracticalProblemAnswerSheetModule { }

