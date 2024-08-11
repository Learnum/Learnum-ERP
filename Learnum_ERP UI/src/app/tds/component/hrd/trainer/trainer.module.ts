import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerRoutingModule } from './trainer-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { TrainerComponent } from './trainer.component';


@NgModule({
  declarations: [
    TrainerComponent
  ],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    SharedModule,
    FormsModule,
    FormlyModule.forRoot(),
  ],
  providers: [],
  exports: [],
})
export class TrainerModule { }
