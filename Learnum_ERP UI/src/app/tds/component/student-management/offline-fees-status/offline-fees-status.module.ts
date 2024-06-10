import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfflineFeesStatusRoutingModule } from './offline-fees-status-routing.module';
import { OfflineFeesStatusComponent } from './offline-fees-status.component';

@NgModule({
  declarations: [OfflineFeesStatusComponent],
  imports: [
    CommonModule,
    OfflineFeesStatusRoutingModule
  ]
})
export class OfflineFeesStatusModule { }
