import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryInfoRoutingModule } from './salary-info-routing.module';
import { SalaryInfoComponent } from './salary-info.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SalaryInfoService } from './salary-info.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SalaryInfoComponent
  ],
  imports: [
    CommonModule,
    SalaryInfoRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [
    SalaryInfoService,
  ]
})
export class SalaryInfoModule { }
