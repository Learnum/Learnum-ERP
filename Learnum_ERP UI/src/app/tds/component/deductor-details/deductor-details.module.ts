import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeductorDetailsComponent } from './deductor-details.component';
import { FormsModule } from '@angular/forms';
import { DeductorDetailsRoutingModule } from './deductor-details-routing.module';



@NgModule({
  declarations: [DeductorDetailsComponent],
  imports: [CommonModule, DeductorDetailsRoutingModule, FormsModule ],
  providers: [],
  exports: [],
})
export class DeductorDetailsModule {}
