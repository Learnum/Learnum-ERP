import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticalProblemExamsRoutingModule } from './practical-problem-exams-routing.module';
import { PracticalProblemExamsComponent} from './practical-problem-exams.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [PracticalProblemExamsComponent],
  imports: [
    CommonModule,
    PracticalProblemExamsRoutingModule,
    SharedModule ,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  
})
export class PracticalProblemExamsModule { }
