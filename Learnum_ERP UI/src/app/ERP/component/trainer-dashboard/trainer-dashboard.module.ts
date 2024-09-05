import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerDashboardRoutingModule } from './trainer-dashboard-routing.module';
import { TrainerDashboardComponent } from './trainer-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
@NgModule({
  declarations: [
    TrainerDashboardComponent
  ],
  imports: [
    CommonModule,
    TrainerDashboardRoutingModule,
    SharedModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  
})
export class TrainerDashboardModule { }
