import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TDSRETURNComponent } from './tds-return.component';
import { TDSRETURNRoutingModule } from './tds-return-routing.module';
import { AddChallanService } from './challan/add-challan/add-challan.service';



@NgModule({
  declarations: [TDSRETURNComponent],
  imports: [CommonModule, TDSRETURNRoutingModule, FormsModule ],
  providers: [AddChallanService],
  exports: [],
})
export class TDSRETURNModule {}
