import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBranchRoutingModule } from './add-branch-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { AddBranchComponent } from './add-branch.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [ AddBranchComponent],
  imports: [
    CommonModule,
    AddBranchRoutingModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    SharedModule,
    FormsModule,
    FormlyModule.forRoot(),
  ],
  providers : [
    
  ]
})
export class AddBranchModule { }
