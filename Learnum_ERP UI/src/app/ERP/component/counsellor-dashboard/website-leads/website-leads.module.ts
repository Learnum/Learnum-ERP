import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteLeadsRoutingModule } from './website-leads-routing.module';
import { WebsiteLeadsComponent } from './website-leads.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
@NgModule({
  declarations: [WebsiteLeadsComponent],
  imports: [
    CommonModule,
    WebsiteLeadsRoutingModule,
    SharedModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WebsiteLeadsModule { }
