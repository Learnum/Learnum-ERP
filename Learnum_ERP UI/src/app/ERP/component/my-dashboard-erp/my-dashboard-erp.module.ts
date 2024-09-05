import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyDashboardErpRoutingModule } from './my-dashboard-erp-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MyDashboardERPComponent } from './my-dashboard-erp.component';
import { FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

@NgModule({
  declarations: [MyDashboardERPComponent],
  imports: [
    CommonModule,
    MyDashboardErpRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule
  ]
})
export class MyDashboardErpModule { }
