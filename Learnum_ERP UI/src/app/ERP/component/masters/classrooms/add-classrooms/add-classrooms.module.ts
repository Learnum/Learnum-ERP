import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddClassroomsRoutingModule } from './add-classrooms-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { AddClassroomsComponent } from './add-classrooms.component';

@NgModule({
  declarations: [AddClassroomsComponent],
  imports: [
    CommonModule,
    AddClassroomsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyBootstrapModule,
    FormlyModule
  ],
  providers : [
  
  ]
})
export class AddClassroomsModule { }
