import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MastersRoutingModule } from './masters-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MastersRoutingModule,
    SharedModule
  ]
})
export class MastersModule { }
