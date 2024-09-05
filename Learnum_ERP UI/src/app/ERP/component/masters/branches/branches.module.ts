import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { BranchesRoutingModule } from './branches-routing.module';
import { BranchesComponent } from './branches.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';


@NgModule({
  declarations: [ BranchesComponent
],
  imports: [
    CommonModule,
    BranchesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyBootstrapModule,
    FormsModule,
    FormlyModule.forRoot(),
   ]
})
export class BranchesModule { }
