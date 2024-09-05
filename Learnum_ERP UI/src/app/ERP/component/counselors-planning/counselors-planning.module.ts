import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounselorsPlanningRoutingModule } from './counselors-planning-routing.module';
import { CounselorsPlanningComponent } from './counselors-planning.component';


@NgModule({
  declarations: [CounselorsPlanningComponent],
  imports: [
    CommonModule,
    CounselorsPlanningRoutingModule
  ]
})
export class CounselorsPlanningModule { }
