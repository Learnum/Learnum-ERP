import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddBranchRoutingModule } from './add-branch-routing.module';
import { AddBranchComponent } from './add-branch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';


@NgModule({
  declarations: [
    AddBranchComponent
  ],
  imports: [
    CommonModule,
    AddBranchRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot(),
    
  ]
})
export class AddBranchModule { }
