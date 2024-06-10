import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddWebsiteRoutingModule } from './add-website-routing.module';
import { AddWebsiteComponent } from './add-website.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
@NgModule({
  declarations: [AddWebsiteComponent],
  imports: [
    CommonModule,
    AddWebsiteRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule
  ]
})
export class AddWebsiteModule { }
