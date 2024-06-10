import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainersPlanningRoutingModule } from './trainers-planning-routing.module';
import { TrainersPlanningComponent } from './trainers-planning.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
@NgModule({
  declarations: [TrainersPlanningComponent,],
  imports: [
    CommonModule,
    TrainersPlanningRoutingModule,
    SharedModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TrainersPlanningModule { }
