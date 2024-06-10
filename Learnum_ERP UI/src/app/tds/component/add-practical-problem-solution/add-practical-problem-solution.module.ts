import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPracticalProblemSolutionRoutingModule } from './add-practical-problem-solution-routing.module';
import { AddPracticalProblemSolutionComponent } from './add-practical-problem-solution.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [
    AddPracticalProblemSolutionComponent
  ],
  imports: [
    CommonModule,
    AddPracticalProblemSolutionRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddPracticalProblemSolutionModule { }
