import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DailyWorkRoutingModule } from './daily-work-routing.module';
import { DailyWorkComponent } from './daily-work.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [
    DailyWorkComponent
  ],
  imports: [
    CommonModule,
    DailyWorkRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormsModule,
    FormlyModule.forRoot(),
  ]
})
export class DailyWorkModule { }
