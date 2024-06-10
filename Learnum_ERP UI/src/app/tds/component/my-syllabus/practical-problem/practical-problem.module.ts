import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PracticalProblemRoutingModule } from './practical-problem-routing.module';
import { PracticalProblemComponent } from './practical-problem.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

@NgModule({
  declarations: [
   PracticalProblemComponent
  ],
  imports: [
    CommonModule,
    PracticalProblemRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule
  ]
})
export class PracticalProblemModule { }
