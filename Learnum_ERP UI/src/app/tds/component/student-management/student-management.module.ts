import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { StudentManagementRoutingModule } from './student-management-routing.module';
import { StudentManagementComponent } from './student-management.component';

@NgModule({
  declarations: [
  StudentManagementComponent
  ],
  imports: [
    CommonModule,
    StudentManagementRoutingModule,
    RouterModule,
    SharedModule,
  ]
})
export class StudentManagementModule { }
