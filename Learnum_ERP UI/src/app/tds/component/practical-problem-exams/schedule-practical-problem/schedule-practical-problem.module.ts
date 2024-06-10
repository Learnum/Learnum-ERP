import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulePracticalProblemRoutingModule } from './schedule-practical-problem-routing.module';
import { SchedulePracticalProblemComponent } from './schedule-practical-problem.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';


@NgModule({
  declarations: [SchedulePracticalProblemComponent],
  imports: [
    CommonModule,
    SchedulePracticalProblemRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot(),
  ]
})
export class SchedulePracticalProblemModule { }
