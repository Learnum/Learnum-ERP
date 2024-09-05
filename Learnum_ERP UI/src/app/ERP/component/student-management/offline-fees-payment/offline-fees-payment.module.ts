import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfflineFeesPaymentRoutingModule } from './offline-fees-payment-routing.module';
import { OfflineFeesPaymentComponent } from './offline-fees-payment.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [OfflineFeesPaymentComponent],
  imports: [
    CommonModule,
    OfflineFeesPaymentRoutingModule,
    SharedModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OfflineFeesPaymentModule { }
