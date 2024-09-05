import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BusinessLeadRoutingModule } from './business-lead-routing.module';
//import { AllBusinessLeadComponent } from './all-business-lead/all-business-lead.component';
//import { AddBusinessLeadComponent } from './add-business-lead/add-business-lead.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { BusinessLeadComponent } from './business-lead.component';
@NgModule({
  declarations: [
    //AllBusinessLeadComponent,
    //AddBusinessLeadComponent,
    BusinessLeadComponent
  ],
  imports: [
    CommonModule,
    BusinessLeadRoutingModule,
    SharedModule ,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  
})
export class BusinessLeadModule { }
