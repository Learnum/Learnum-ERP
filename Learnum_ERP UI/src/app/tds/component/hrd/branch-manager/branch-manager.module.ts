import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchManagerRoutingModule } from './branch-manager-routing.module';
import { AddBranchComponent } from './add-branchManager/add-branch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { BranchManagerComponent } from './branch-manager.component';



@NgModule({
  declarations: [
   BranchManagerComponent
  ],
  imports: [
    CommonModule,
    BranchManagerRoutingModule,
    SharedModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormsModule
  ]
})
export class BranchManagerModule { }
