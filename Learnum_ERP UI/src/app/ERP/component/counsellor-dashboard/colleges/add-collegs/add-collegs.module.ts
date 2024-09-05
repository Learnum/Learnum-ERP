import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCollegsRoutingModule } from './add-collegs-routing.module';
import { AddCollegsComponent } from './add-collegs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
//import { ContactDetailsComponent } from './contact-details/contact-details.component';


@NgModule({
  declarations: [AddCollegsComponent],
  imports: [
    CommonModule,
    AddCollegsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule,
  ]
})
export class AddCollegsModule { }
