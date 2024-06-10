import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddTrainerRoutingModule } from './add-trainer-routing.module';
import { AddTrainerComponent } from './add-trainer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';


@NgModule({
  declarations: [
    AddTrainerComponent
  ],
  imports: [
    CommonModule,
    AddTrainerRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
   
    FormlyModule.forRoot(),
  ]
})
export class AddTrainerModule { }
