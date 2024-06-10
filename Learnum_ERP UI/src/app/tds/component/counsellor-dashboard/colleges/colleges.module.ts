import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CollegesRoutingModule } from './colleges-routing.module';
import { CollegesComponent } from './colleges.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [CollegesComponent],
  imports: [
    CommonModule,
    CollegesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot(),
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CollegesModule { }
