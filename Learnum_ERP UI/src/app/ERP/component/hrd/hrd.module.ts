import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HrdRoutingModule } from './hrd-routing.module';
import { HrdComponent } from './hrd.component';

@NgModule({
  declarations: [HrdComponent],
  imports: [
    CommonModule,
    HrdRoutingModule,
    SharedModule
  ]
})
export class HrdModule { }
