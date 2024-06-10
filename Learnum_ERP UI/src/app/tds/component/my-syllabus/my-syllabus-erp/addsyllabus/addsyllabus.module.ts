import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddsyllabusRoutingModule } from './addsyllabus-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { AddsyllabusComponent } from './addsyllabus.component';


@NgModule({
  declarations: [AddsyllabusComponent],
  imports: [
    CommonModule,
    AddsyllabusRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyBootstrapModule

  ]
})
export class AddsyllabusModule { }
