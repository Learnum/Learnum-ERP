import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddgeneralexamRoutingModule } from './addgeneralexam-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { AddgeneralexamComponent } from './addgeneralexam.component';


@NgModule({
  declarations: [AddgeneralexamComponent],
  imports: [
    CommonModule,
    AddgeneralexamRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyBootstrapModule
  ]
})
export class AddgeneralexamModule { }
